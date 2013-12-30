/**
 *  Clients Controller
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T21:18:32.364Z
 *
 *  Created by create-controller script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

var pager = require('../../lib/pager.js'),
ViewTemplatePath = 'admin/clients';

module.exports = {

    /**
     * Index action, returns a list either via the admin/views/clients/index.ejs view or via json
     * Default mapping to GET 'admin/clients'
     * For JSON use 'admin/clients.json'
     * View Helper method pathTo.admin_clients()
     * For paging use  pathTo.paging_admin_clients(from, to)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'index': function(req, res, next) {
        var title = "Clients";
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
        
        
        
        
        
        
        
        
        
        Client.count(opts.where, function (err, count) {
        total = count;
        var pagerHtml = pager.render(from, to, total, pathTo.admin_clients());

        Client.all(opts, function (err, clients) {
                if(err) return next(err);
                switch (format.toString()) {
                    case 'json':
                        res.send(clients.map(function(u) {
                            return u.toObject();
                        }));
                        break;
                    default:
                        res.render(ViewTemplatePath,{clients:clients,pagerHtml:pagerHtml,title:title});
                }
            });
        });
    },

    /**
     * Show action, returns shows a single item via admin/views/clients/show.ejs view or via json
     * Default mapping to GET 'admin/client/:id'
     * For JSON use 'admin/client/:id.json'
     * View Helper method pathTo.show_admin_client(instance)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'show': function(req, res, next) {
            var title = "Show Client";
            var format = req.params.format || '';
            Client.findById(req.params.id, function(err, client) {

            if(err) { return next(err); }

            switch (format.toString()) {
                case 'json':
                    res.send(client.toObject());
                    break;

                default:
                    res.render(ViewTemplatePath + "/show",{client:client,title:title});
            }
        });
    },

    /**
     * New action, returns a form via admin/views/clients/edit.ejs view no JSON view.
     * Default mapping to GET 'admin/client/new'
     * View Helper method pathTo.new_admin_client()
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'new': function(req, res, next) {
        var title = "New Client";
        var client = new Client();
        res.render(ViewTemplatePath + "/new",{
              client:client,
              title:title
        });
    },

    /**
     * Edit action, returns a form via admin/views/clients/edit.ejs view no JSON view.
     * Default mapping to GET 'admin/client/:id/edit'
     * View Helper method pathTo.edit_admin_client(instance)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'edit': function(req, res, next) {
            var title = "Edit Client";
            Client.findById(req.params.id, function(err, client) {
            if(err) return next(err);
            res.render(ViewTemplatePath + "/edit",{
                 client:client,
                 title:title
            });
        });
    },

    /**
     * Update action, updates a single item and redirects to Show or returns the object as json
     * Default mapping to PUT 'admin/client/:id', no GET mapping
     * View Helper method pathTo.update_admin_client(id)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'update': function(req, res, next) {
        var format = req.params.format || '';
        Client.findById(req.params.id, function(err, client) {
            client.updateAttributes(req.body.client, function(err) {

                if (err) {
                    console.log(err);
                    req.flash('error','Could not update client: ' + err);
                    res.redirect(pathTo.edit_admin_client(client));
                    return;
                }

                switch (format.toString()) {
                    case 'json':
                        res.send(client.toObject());
                        break;
                    default:
                        req.flash('info', 'Client updated');
                        res.redirect(pathTo.show_admin_client(client));
                }
            });
        });
    },

    /**
     * Create action, creates a single item and redirects to Show or returns the object as json
     * Default mapping to POST 'admin/clients', no GET mapping
     * View Helper method pathTo.create_admin_client()
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'create': function(req, res, next){
        var format = req.params.format || '';
        var client = new Client(req.body.client);

            client.save(function(err) {

            if (err) {
                req.flash('error','Could not create client: ' + err);
                res.redirect(pathTo.admin_clients());
                return;
            }

            switch (format.toString()) {
                case 'json':
                    res.send(client.toObject());
                    break;
                default:
                    req.flash('info','Client created');
                    res.redirect(pathTo.show_admin_client(client));
            }
        });
    },

    /**
     * Delete action, deletes a single item and redirects to index
     * Default mapping to DEL 'admin/client/:id', no GET mapping
     * View Helper method pathTo.destroy_admin_client(instance)
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'destroy': function(req, res, next){

            Client.findById(req.params.id, function(err, client) {

            if (!client) {
                req.flash('error','Unable to locate the client to delete!');
                res.send('false');
                return false;
            };

                client.destroy(function(err) {
                if(err) {
                    req.flash('error','There was an error deleting the client!');
                    res.send('"' + pathTo.admin_clients() + '"');
                } else {
                    req.flash('info','Client deleted');
                    res.send('"' + pathTo.admin_clients() + '"');
                }
            });
        });
    },

    /**
     * Delete action, deletes a all items and redirects to index
     * Default mapping to DEL 'admin/clients', no GET mapping
     * View Helper method pathTo.destroy_admin_clients()
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'destroyall': function(req, res, next){
        Client.destroyAll(function(err) {
            if(err) {
                req.flash('error','There was an error deleting the clients!');
                res.send('"' + pathTo.admin_clients() + '"');
            } else {
                req.flash('info','Clients deleted');
                res.send('"' + pathTo.admin_clients() + '"');
            }
        });
    }
};