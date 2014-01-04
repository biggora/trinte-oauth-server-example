/**
 *  Default configuration file
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

module.exports = {
    app: {
      title : 'Aginte Test Server'
    },
    port : 3000,
    debug: false,
    language: "en",
    session: {
        maxAge : 8640000,
        key : "trinte",
        secret : "Afeb722690aeccfa92ca9ee6fdf06e55aF",
        clear_interval: 60
    },
    parser : {
        encoding : "utf-8",
        keepExtensions : true
    },
    oauth : {
        token_len: 48,
        code_len: 16,
        token_live : 3600,
        code_live : 1200,
        clear_interval: 60
    }
};