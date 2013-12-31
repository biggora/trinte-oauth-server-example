/**
 * Created by Alex on 12/31/13.
 */

var Helper = require( '../app/helpers/ApplicationHelper' );
var database = require( '../config/database' );
var Schema = require( 'caminte' ).Schema;
var schema = new Schema( database.db.driver, database.db );
var Client = require( '../app/models/Client' )( schema );
var User = require( '../app/models/User' )( schema );
var salt = Helper.uid( 8 );
var cleanPass = 'horse2014';

// require( '../app/helpers/ModelsHelper' );

var dUser = {
    active: 1,
    email: 'example@server.com',
    salt: salt,
    password: Helper.createPasswordHash( cleanPass, salt ),
    first_name: 'Alexey',
    last_name: 'Gordeyev',
    photo: '',
    birthday: '1970-01-03',
    website: 'http://www.gordejev.lv/',
    language: 'ru',
    account_type: 'admin'
};

var dClient = {
    active: 1,
    client_name: 'First App',
    client_type: 'website',
    client_id: Helper.createKey( salt, 'MYKEY_' ),
    client_secret: Helper.uid( 32 ),
    redirect_uri: 'http://localhost:3000/',
    grant_types: '',
    user_id: 0
};

console.log( '###    Created User & Client    ###' );
console.log( '===================================' );

/* Create User */
User.findOrCreate( {
    email: dUser.email
}, dUser, function(err, user) {
    if( user && !err ) {
        console.log( '###     User     ###' );
        console.log( '          id: ' + user.id );
        console.log( '       login: ' + user.email );
        console.log( '    password: ' + cleanPass );
        console.log( '===================================' );

        /* set user id */
        dClient.user_id = user.id;

        /* Create Client */
        Client.findOrCreate( {
            client_id: dClient.client_id
        }, dClient, function(err, client) {
            if( client && !err ) {
                console.log( '###   Client     ###' );
                console.log( '          ID: ' + client.client_id );
                console.log( '      SECRET: ' + client.client_secret );
                console.log( '===================================' );
            } else {
                console.log( 'Create Client ERROR: ', err );
            }
        } );
    } else {
        console.log( 'Create User ERROR: ', err );
    }
} );

