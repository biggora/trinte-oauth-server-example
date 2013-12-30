/**
 *  Users Controller
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T19:24:20.265Z
 *
 *  Created by create-controller script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

var pager = require('../../lib/pager.js'),
ViewTemplatePath = 'admin/users';

module.exports = {

    /**
     * Index action, returns a list either via the admin/views/users/index.ejs view or via json
     * Default mapping to GET 'admin/users'
     * For JSON use 'admin/users.json'
     * View Helper method pathTo.admin_users()
     * For paging use  pathTo.paging_admin_users(from, to)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'index': function(req, res, next) {
        var title = "Users";
        var format = req.params.format || '';
        var sort = req.query.sort;
        var search = req.query.search;
        var from = req.params.from ? parseInt(req.params.from) - 1 : 0;
        var to = req.params.to ? parseInt(req.params.to) : 20;
        var total = 0;
        var opts = {
            skip : from,
            limit : to,
            order : 'id DESC',
            where : {}
        };

        if(sort && sort !== '') {
            var direction = 'ASC';
            if(sort.substr(0,1) === '-') {
                direction = 'DESC';
                sort = sort.substr(1,sort.length);
            }
            opts.order = sort + " " + direction;
        }

        
        User.count(opts.where, function (err, count) {
        total = count;
        var pagerHtml = pager.render(from, to, total, pathTo.admin_users());

        User.all(opts, function (err, users) {
                if(err) return next(err);
                switch (format.toString()) {
                    case 'json':
                        res.send(users.map(function(u) {
                            return u.toObject();
                        }));
                        break;
                    default:
                        res.render(ViewTemplatePath,{users:users,pagerHtml:pagerHtml,title:title});
                }
            });
        });
    },

    /**
     * Show action, returns shows a single item via admin/views/users/show.ejs view or via json
     * Default mapping to GET 'admin/user/:id'
     * For JSON use 'admin/user/:id.json'
     * View Helper method pathTo.show_admin_user(instance)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'show': function(req, res, next) {
            var title = "Show User";
            var format = req.params.format || '';
            User.findById(req.params.id, function(err, user) {

            if(err) { return next(err); }

            switch (format.toString()) {
                case 'json':
                    res.send(user.toObject());
                    break;

                default:
                    res.render(ViewTemplatePath + "/show",{user:user,title:title});
            }
        });
    },

    /**
     * New action, returns a form via admin/views/users/edit.ejs view no JSON view.
     * Default mapping to GET 'admin/user/new'
     * View Helper method pathTo.new_admin_user()
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'new': function(req, res, next) {
        var title = "New User";
        var user = new User();
        res.render(ViewTemplatePath + "/new",{
              user:user,
              title:title
        });
    },

    /**
     * Edit action, returns a form via admin/views/users/edit.ejs view no JSON view.
     * Default mapping to GET 'admin/user/:id/edit'
     * View Helper method pathTo.edit_admin_user(instance)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'edit': function(req, res, next) {
            var title = "Edit User";
            User.findById(req.params.id, function(err, user) {
            if(err) return next(err);
            res.render(ViewTemplatePath + "/edit",{
                 user:user,
                 title:title
            });
        });
    },

    /**
     * Update action, updates a single item and redirects to Show or returns the object as json
     * Default mapping to PUT 'admin/user/:id', no GET mapping
     * View Helper method pathTo.update_admin_user(id)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'update': function(req, res, next) {
        var format = req.params.format || '';
        User.findById(req.params.id, function(err, user) {
            user.updateAttributes(req.body.user, function(err) {

                if (err) {
                    console.log(err);
                    req.flash('error','Could not update user: ' + err);
                    res.redirect(pathTo.edit_admin_user(user));
                    return;
                }

                switch (format.toString()) {
                    case 'json':
                        res.send(user.toObject());
                        break;
                    default:
                        req.flash('info', 'User updated');
                        res.redirect(pathTo.show_admin_user(user));
                }
            });
        });
    },

    /**
     * Create action, creates a single item and redirects to Show or returns the object as json
     * Default mapping to POST 'admin/users', no GET mapping
     * View Helper method pathTo.create_admin_user()
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'create': function(req, res, next){
        var format = req.params.format || '';
        var user = new User(req.body.user);

            user.save(function(err) {

            if (err) {
                req.flash('error','Could not create user: ' + err);
                res.redirect(pathTo.admin_users());
                return;
            }

            switch (format.toString()) {
                case 'json':
                    res.send(user.toObject());
                    break;
                default:
                    req.flash('info','User created');
                    res.redirect(pathTo.show_admin_user(user));
            }
        });
    },

    /**
     * Delete action, deletes a single item and redirects to index
     * Default mapping to DEL 'admin/user/:id', no GET mapping
     * View Helper method pathTo.destroy_admin_user(instance)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'destroy': function(req, res, next){

            User.findById(req.params.id, function(err, user) {

            if (!user) {
                req.flash('error','Unable to locate the user to delete!');
                res.send('false');
                return false;
            };

                user.destroy(function(err) {
                if(err) {
                    req.flash('error','There was an error deleting the user!');
                    res.send('"' + pathTo.admin_users() + '"');
                } else {
                    req.flash('info','User deleted');
                    res.send('"' + pathTo.admin_users() + '"');
                }
            });
        });
    },

    /**
     * Delete action, deletes a all items and redirects to index
     * Default mapping to DEL 'admin/users', no GET mapping
     * View Helper method pathTo.destroy_admin_users()
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'destroyall': function(req, res, next){
        User.destroyAll(function(err) {
            if(err) {
                req.flash('error','There was an error deleting the users!');
                res.send('"' + pathTo.admin_users() + '"');
            } else {
                req.flash('info','Users deleted');
                res.send('"' + pathTo.admin_users() + '"');
            }
        });
    }
};