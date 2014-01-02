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
var fs = require( 'fs' );

module.exports = {
    /**
     * Default Application index - shows a list of the controllers.
     * Redirect here if you prefer another controller to be your index.
     * @param req
     * @param res
     * @param next
     */
    'index': function(req, res, next) {

        /**
         * If you want to redirect to another controller, uncomment
         */

        var controllers = [];

        fs.readdir( __dirname + '/', function(err, files) {

            if( err )
                throw err;

            files.forEach( function(file) {
                if( /\.js$/i.test( file ) ) {
                    if( file !== "AppsController.js" ) {
                        controllers.push( file.replace( 'Controller.js', '' ).toLowerCase() );
                    }
                }
            } );

            res.render( 'app', {
                controllers: controllers
            } );

        } );
    },
    /**
     * Default Application login page.
     * @param req
     * @param res
     * @param next
     */
    'login': function(req, res, next) {

        res.render( 'login', {
            controllers: []
        } );

    },
    /**
     * Default Application registration action.
     * @param req
     * @param res
     * @param next
     */
    'registration': function(req, res, next) {

        res.render( 'login', {
            controllers: []
        } );

    },
    /**
     * Default Application registration action.
     * @param req
     * @param res
     * @param next
     */
    'checkmail': function(req, res, next) {

        res.render( 'login', {
            controllers: []
        } );

    },
    /**
     * Default Application dialog action.
     * @param req
     * @param res
     * @param next
     */
    'dialog': function(req, res, next) {
        res.render( 'dialog', {
            transactionID: req.oauth2.transactionID,
            user: req.oauth2.user,
            client: req.oauth2.client,
            controllers: []
        } );
    }
};