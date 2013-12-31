/**
 *  Models Helper
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/* User */
User.validatesInclusionOf('gender', {in: ['male', 'female']});
User.validatesInclusionOf('account_type', {in: ['user', 'admin']});

User.prototype.validPassword = function(password) {
    return this.password === createPasswordHash(password, this.salt) ? true : null ;
};
User.prototype.fullName = function() {
    return this.first_name + ' ' + this.last_name;
};