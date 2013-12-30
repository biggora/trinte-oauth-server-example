/**
 *  Models Helper
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

User.prototype.validPassword = function(password) {
    return this.password === password ? true : null ;
}