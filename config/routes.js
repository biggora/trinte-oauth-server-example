/**
 *  Routes manager
 *  Inject resource mapper reference
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 *
 **/

var auth = require( './auth/login' );
var oauth2 = require( './auth/oauth2' );
var express = require( 'express' );

module.exports = function routes(map) {

    /*
     API namespace, nested routes
     + Require `Bearer` tokens auth
     example:
          /api/me?token=khVUYFuyygGKJHb   // logged user info
     */
    map.namespace( "api", {
        middleware: [auth.bearerAuth()]
    }, function(api) {
        api.get( "/me.:format?", "api/users#index" );
    } );

    /* Main page uri */
    map.root( "apps#index" );

    /* OAuth `Request for Permission` Dialog uri */
    map.get( '/oauth/authorize', 'apps#dialog', [
        auth.isLoggedIn( '/login' ),
        express.csrf(),
        oauth2.authorization,
        oauth2.isPermited()
    ] );
    map.post( '/oauth/authorize/decision', oauth2.decision[1], [
        auth.isLoggedIn( '/login' ),
        express.csrf(),
        oauth2.decision[0],
        oauth2.createPermition()
    ] );

    /* OAuth Access Token generation uri */
    map.post( '/oauth/access_token', oauth2.token );

    /* OAuth Tokens and Codes test page */
    map.get( '/oauth/test', 'apps#test' );

    /* Logout uri */
    map.all( '/logout', auth.logOut( "/" ) );

    /* Login page uri */
    map.get( '/login', "apps#login", express.csrf() );
    map.get( '/admin/login', "admin/apps#login", express.csrf() );
    map.post( '/login', auth.localAuth() );

    /* Tools pages */
    map.get( "/register", "apps#login" );
    map.post( "/register", "apps#register" );
    map.post( "/checkmail", "apps#checkmail" );

    /*
     Admin namespace, nested routes
     + Require local auth with user account_type = `admin`
     example:
         /admin          // Dashboard page
         /admin/users    // Users section
         /admin/clients  // Clients section
     */
    map.all( "/admin", "admin/apps#index", [
        auth.isLoggedIn( '/admin/login' ),
        auth.isAdmin(),
        express.csrf()
    ] );
    map.namespace( "admin", {
        middleware: [
            auth.isLoggedIn( '/admin/login' ),
            auth.isAdmin(),
            express.csrf()
        ]
    }, function(admin) {
        admin.resources( "users" );
        admin.resources( "clients" );
    } );
};