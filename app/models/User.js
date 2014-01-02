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
module.exports = function(schema) {
    var User = schema.define( 'user', {
        active: { type: Number, 'default': 1, index: true },
        username: { type: String, unique: true },
        password: { type: String },
        salt: { type: String },
        first_name: { type: String, index: true },
        last_name: { type: String, index: true },
        gender: { type: String, 'default': 'male' },
        photo: { type: String },
        birthday: { type: Date },
        website: { type: String },
        provider: { type: String, 'default': 'password' },
        language: { type: String, 'default': 'en' },
        account_type: { type: String, 'default': 'user' },
        account_currency: { type: String, 'default': 'EUR' },
        created: { type: Date, 'default': Date.now }
    } );
    return User;
};