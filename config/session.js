/**
 *  Default session manager
 *  Inject app and express reference
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/
 
var config = require('./configuration');
var CaminteStore = require('connect-caminte');
var database = require('./database' ).db;

module.exports = function (app,express) {
    var sessionStore = CaminteStore(express);
    app.configure(function () {
        app.use(express.session({
            cookie: {
                maxAge: config.session.maxAge
            },
            key: config.session.key,
            secret: config.session.secret,
            store: new sessionStore({
                driver: database.driver,
                collection: 'session',
                db: database,
                secret: config.session.secret,
                maxAge: config.session.maxAge,
                clear_interval: config.session.clear_interval
            })
        }));
    });
};