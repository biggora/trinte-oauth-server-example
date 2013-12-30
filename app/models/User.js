/**
 *  User schema
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-26T19:24:20.254Z
 *
 *  Created by create-model script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 *  Define User Model
 *  @param {Object} schema
 **/
module.exports = function(schema){
    var User = schema.define('user', {
	         active : { type: Boolean },
	         email : { type: String },
	         password : { type: String },
	         first_name : { type: String },
	         last_name : { type: String },
	         gender : { type: String },
	         photo : { type: String },
	         birthday : { type: Date },
	         website : { type: String },
	         provider : { type: String },
	         language : { type: String },
	         account_type : { type: String },
	         account_currency : { type: String }
    });
    return User;
};