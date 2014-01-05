/**
 *  Permission schema
 *
 *  @package     trinte-restful-server-example
 *  @version     0.0.1
 *  @desc        Example RESTFul server based on TrinteJS MVC framework
 *  @author      [object Object]
 *  @created     2014-01-03T12:52:39.391Z
 *
 *  Created by create-model script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 *  Define Permission Model
 *  @param {Object} schema
 **/
module.exports = function(schema) {
    var Permission = schema.define( 'oauth_permission', {
        client_id: { type: String, index: true },
        user_id: { type: String, index: true },
        scope: { type: String, 'default': '*'},
        created: { type: Date, 'default': Date.now }
    } );
    return Permission;
};