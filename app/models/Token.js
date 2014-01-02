/**
 *  Token schema
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T21:14:41.197Z
 *
 *  Created by create-model script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 *  Define Token Model
 *  @param {Object} schema
 **/
module.exports = function(schema) {
    var Token = schema.define( 'token', {
        access_token: { type: String, unique: true },
        refresh_token: { type: String, unique: true },
        client_id: { type: String, index: true },
        user_id: { type: String, index: true },
        expires: { type: Number, index: true },
        scope: { type: String, 'default': '*' },
        created: { type: Date, 'default': Date.now }
    } );
    return Token;
};