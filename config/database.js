/**
 *  Default database configuration file
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

module.exports = {
    db: {
        driver     : "sqlite3",
        host       : "localhost",
        port       : "",
        username   : "",
        password   : "",
        database   : "./db/base.sqlite"
    },
    dburi: function() {
        var uri = "mongodb://", port = 27017;
        if(this.db.username !== "" && this.db.password !== "") {
            uri += this.db.username + ':' + this.db.password + '@';
        }
        if(this.db.port !== "") {
            port = this.db.port;
        }
        uri += this.db.host + ':' + port;
        uri += '/' + this.db.database;
        return uri;
    }
};