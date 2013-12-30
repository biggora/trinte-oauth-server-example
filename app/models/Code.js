/**
 *  Code schema
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T21:56:31.233Z
 *
 *  Created by create-model script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 *  Define Code Model
 *  @param {Object} schema
 **/
module.exports = function(schema) {
    var Code = schema.define( 'code', {
        authorization_code: { type: String, index: true },
        client_id: { type: String, index: true },
        user_id: { type: String },
        redirect_uri: { type: String },
        expires: { type: Number, index: true },
        scope: { type: String },
        created: { type: Date, 'default': Date.now }
    } );
    return Code;
};