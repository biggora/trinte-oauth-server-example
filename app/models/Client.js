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
module.exports = function(schema){
    var Client = schema.define('client', {
	         client_name : { type: String },
	         client_type : { type: String },
	         client_id : { type: String },
	         client_secret : { type: String },
	         redirect_uri : { type: String },
	         grant_types : { type: String },
	         user_id : { type: String },
	         created : { type: Date }
    });
    return Client;
};