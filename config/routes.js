/**
 *  Routes manager
 *  Inject resource mapper reference
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/
var auth = require( './auth/login' );
var oauth2 = require( './auth/oauth2' );
var express = require( 'express' );

module.exports = function routes(map) {
    map.namespace( "api", {
        middleware: auth.bearerAuth()
    }, function(api) {
        api.resources( "users" );
    } );

    // app.post('/oauth/token', oauth2.token);
    map.root( "apps#index" );
    // [auth.isLoggedIn( '/login' ),  ]
    map.get( '/authorize', 'apps#dialog', [auth.isLoggedIn( '/login' ), oauth2.authorization] );
    map.post( '/dialog/authorize/decision', oauth2.decision, auth.isLoggedIn( '/login' ) );
    map.post( '/oauth/token', oauth2.token );
    map.all( '/logout', auth.logOut( "/" ) );
    map.get( '/login', "apps#login", express.csrf() );
    map.post( '/login', auth.localAuth() );
    map.get( "/register", "apps#login" );
    map.post( "/register", "apps#register" );
    map.post( "/checkmail", "apps#checkmail" );

    map.all( "/admin", "admin/apps#index", [auth.isLoggedIn( '/login' ), express.csrf()] );
    map.namespace( "admin", {
        middleware: [auth.isLoggedIn( '/login' ), express.csrf() ]
    }, function(admin) {
        admin.resources( "users" );
        admin.resources( "clients" );
    } );


};