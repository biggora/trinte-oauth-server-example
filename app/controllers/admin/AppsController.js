/**
 *  Apps Controller
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T09:31:19.272Z
 *
 *  Created by create-controller script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

module.exports = {
    /**
     * Admin dashboard.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'index': function(req, res, next) {
        res.render( 'admin/app', {
            controllers: []
        } );
    },
    /**
     * Admin login page.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'login': function(req, res, next) {
        res.render( 'admin/login', {
            title: 'Login',
            controllers: []
        } );
    }
};