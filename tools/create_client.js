/**
 * Created by Alex on 12/31/13.
 */

var Helper = require( '../app/helpers/ApplicationHelper' );
var database = require( '../config/database' );
var Schema = require( 'caminte' ).Schema;
var schema = new Schema( database.db.driver, database.db );
var Client = require( '../app/models/Client' )( schema );
var salt = Helper.uid( 8 );

// require( '../app/helpers/ModelsHelper' );

var dClient = {
    active: 1,
    client_name: 'Any App',
    client_type: 'website',
    client_id: Helper.createKey( salt, 'MYKEY_' ),
    client_secret: Helper.uid( 32 ),
    redirect_uri: 'http://localhost:3000/',
    grant_types: '',
    user_id: 1  // Change user_id
};

console.log( '###    Created Client    ###' );
console.log( '==========================' );

/* Create Client */
Client.findOrCreate( {
    client_id: dClient.client_id
}, dClient, function(err, client) {
    if( client && !err ) {
        console.log( '###   Client     ###' );
        console.log( '          ID: ' + client.client_id );
        console.log( '      SECRET: ' + client.client_secret );
        console.log( '==========================' );
    } else {
        console.log( 'Create Client ERROR: ', err );
    }
} );