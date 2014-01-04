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
 *
 **/


module.exports = {
    /**
     * Default Application index - shows a list of the controllers.
     * Redirect here if you prefer another controller to be your index.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'index': function(req, res, next) {
        var controllers = [];
        res.render( 'app', {
            controllers: controllers
        } );
    },
    /**
     * Default Application login page.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'login': function(req, res, next) {
        res.render( 'oauth/login', {
            title: 'Login',
            controllers: []
        } );
    },
    /**
     * Default Application registration action.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'registration': function(req, res, next) {
        res.render( 'oauth/login', {
            title: 'Registration',
            controllers: []
        } );
    },
    /**
     * Check email address action.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'checkmail': function(req, res, next) {
        res.render( 'api/empty', {
            controllers: []
        } );
    },
    /**
     * Show dialog action.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'dialog': function(req, res, next) {
        var user = req.oauth2.user;
        var client = req.oauth2.client;

        res.render( 'oauth/dialog', {
            title: 'Request for Permission',
            transactionID: req.oauth2.transactionID,
            user: user,
            client: client,
            scope: client.scope,
            csrf: req.csrfToken()
        } );

    },
    /**
     * Show OAuth Token test action.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    'test': function(req, res, next) {
        res.render( 'oauth/test', {
            title: 'OAuth Token Test',
            controllers: []
        } );
    }
};