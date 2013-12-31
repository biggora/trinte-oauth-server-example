/**
 *  Client schema
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T21:18:35.864Z
 *
 *  Created by create-model script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 *  Define Client Model
 *  @param {Object} schema
 **/
module.exports = function(schema) {
    var Client = schema.define( 'client', {
        active: { type: Number, 'default': 1, index: true },
        client_name: { type: String, unique: true },
        client_type: { type: String, 'default': 'website' },
        client_id: { type: String, index: true },
        client_secret: { type: String },
        redirect_uri: { type: String },
        grant_types: { type: String },
        user_id: { type: String, index: true },
        created: { type: Date, 'default': Date.now }
    } );
    return Client;
};