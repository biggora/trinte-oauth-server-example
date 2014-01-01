/**
 *  Default errors pages manager
 *  Inject app reference
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 *
 *  @param {TrinteJS} app
 **/

module.exports = function(app) {
    // 401, 403, 500  error page
    app.use( function(err, req, res, next) {
        res.status( err.status || 500 );
        if( parseInt( err.status ) === 403 ) {
            res.send( err.status + ' ' + err.message );
        } else if( parseInt( err.status ) === 401 ) {
            res.send( err.status + ' ' + err.message );
        } else {
            console.log( 'Internal Server Error: ' + err.message );
            res.send( err.status + ' ' + err.message );
        }
    } );

    // 404 error page
    app.use( function(req, res) {
        res.send( '404 Not found' );
    } );
};