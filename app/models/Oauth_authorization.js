/**
 *  Oauth_authorization schema
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T19:51:39.192Z
 *
 *  Created by create-model script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 *  Define Oauth_authorization Model
 *  @param {Object} schema
 **/
module.exports = function(schema){
    var Oauth_authorization = schema.define('oauth_authorization', {
	         client_id : { type: String },
	         user_id : { type: String },
	         redirect_uri : { type: String },
	         expires : { type: String },
	         scope : { type: String }
    });
    return Oauth_authorization;
};