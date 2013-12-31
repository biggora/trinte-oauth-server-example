/**
 * Created by Alex on 12/31/13.
 */

var database = require( '../config/database' );
var Schema = require( 'caminte' ).Schema;
var schema = new Schema( database.db.driver, database.db );
var Client = require( '../app/models/Client' )( schema );
var Token = require( '../app/models/Token' )( schema );
var User = require( '../app/models/User' )( schema );
var Code = require( '../app/models/Code' )( schema );

// require( '../app/helpers/ModelsHelper' );

console.log( '###    Clear All tables (collections)    ###' );
console.log( '===========================================' );

User.destroyAll(function(err){
    if(err) {
        console.log( '---    Clear Users ERROR: ', err );
    }  else {
        console.log( '###    Clear Users completed! ' );
    }
    Client.destroyAll(function(err){
        if(err) {
            console.log( '---    Clear Clients ERROR: ', err );
        }  else {
            console.log( '###    Clear Clients completed! ' );
        }
        Token.destroyAll(function(err){
            if(err) {
                console.log( '---    Clear Tokens ERROR: ', err );
            }   else {
                console.log( '###    Clear Tokens completed! ' );
            }
            Code.destroyAll(function(err){
                if(err) {
                    console.log( '---    Clear Auth. codes ERROR: ', err );
                }  else {
                    console.log( '###    Clear Auth. codes completed! ' );
                }
            });
        });
    });
});
