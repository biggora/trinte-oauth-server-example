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
    }
};
