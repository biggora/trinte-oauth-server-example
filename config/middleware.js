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
    } );
};