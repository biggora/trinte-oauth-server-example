/**
 *  Application Helper
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/
var crypto = require( 'crypto' );

module.exports = {
    getRandomInt: function(min, max) {
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    },
    uid: function(len) {
        var buf = []
            , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            , charlen = chars.length;

        for( var i = 0; i < len; ++i ) {
            buf.push( chars[this.getRandomInt( 0, charlen - 1 )] );
        }

        return buf.join( '' );
    },
    createKey: function(data, prefix) {
        var hash = crypto.createHash( 'sha1' );
        data = !data ? new Date().getTime() : data;
        prefix = prefix ? prefix.toString() : 'SCRTKEY_';
        hash.update( data.toString() );
        return prefix + hash.digest( 'hex' ).toString();
    },
    createPasswordHash: function(pass, salt, algorithm) {
        algorithm = algorithm ? algorithm.toString() : 'sha1';
        salt = salt ? salt.toString() : '';
        var hash = crypto.createHash( algorithm );
        hash.update( pass.toString() + salt );
        var nPass = hash.digest( 'hex' ).toString();
        return  pass && pass !== '' ? nPass : '';
    },
    normalizeDate: function(date) {
        if( typeof date === 'number' ) {
            return new Date( date ).toISOString();
        } else if( date.getTime ) {
            return date.toISOString();
        } else {
            return new Date().toISOString();
        }
    },
    getClientIp: function(req) {
        var ipAddress;
        // The request may be forwarded from local web server.
        var forwardedIpsStr = req.header( 'x-forwarded-for' );
        if( forwardedIpsStr ) {
            // 'x-forwarded-for' header may return multiple IP addresses in
            // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
            // the first one
            var forwardedIps = forwardedIpsStr.split( ',' );
            ipAddress = forwardedIps[0];
        }
        if( !ipAddress ) {
            // If request was not forwarded
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    }
};
