/**
 *  Default middleware manager
 *  Inject app and express reference
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

var useragent = require( 'express-useragent' );
var auth = require( './auth/login' );

module.exports = function(app, express) {
    app.configure( function() {

        // app.use(express.csrf());
        app.use( useragent.express() );

        app.use( auth.passport.initialize() );
        app.use( auth.passport.session() );

        // Cross domain authentication
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            if ('OPTIONS' === req.method) {
                res.send(200);
            } else {
                next();
            }
        });
    } );
};