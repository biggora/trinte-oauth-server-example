/**
 *  Application Helper
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

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
    }
};
