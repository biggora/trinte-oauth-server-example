/**
 *  Users Controller
 *
 *  @package     Oauth2Server
 *  @version     0.0.1
 *  @desc        Web-based Application
 *  @author      Alex
 *  @created     2013-12-27T15:23:00.879Z
 *
 *  Created by create-controller script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

var ViewTemplatePath = 'api/users';

module.exports = {

    /**
     * index action
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    'index': function(req, res, next) {
        var format = req.param( 'format' ) || 'json';
        switch(format.toString()) {
            case 'text':
            case 'html':
                res.send( 'Unsupported format' );
                break;
            case 'xml':
                res.send( 'XML' );
                break;
            default:
                res.send( 'JSON' );
        }
     }

};