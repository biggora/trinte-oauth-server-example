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
    var resErr = {
        error: {
            status: 404,
            message: "Not Found.",
            type: "AginteException",
            code: 1
        }
    };

    // 401, 403, 500  error page
    app.use( function(err, req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.status( err.status || 500 );
        if( parseInt( err.status ) === 500 ) {
            console.log( 'Internal Server Error: ' + err.message );
            resErr.error.code = 2;
        } else {
            resErr.error.code = 3;
        }
        resErr.error.status = err.status;
        resErr.error.message = err.message;
        res.send( resErr );
    } );

    // 404 error page
    app.use( function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.send( resErr );
    } );
};