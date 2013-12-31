/**
 *  Models Helper
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/* User Model */
User.validatesInclusionOf( 'gender', {in: ['male', 'female']} );
User.validatesInclusionOf( 'account_type', {in: ['user', 'admin']} );

User.hasMany( Client, {as: 'clients', foreignKey: 'user_id'} );
User.hasMany( Token, {as: 'tokens', foreignKey: 'user_id'} );
User.hasMany( Code, {as: 'codes', foreignKey: 'user_id'} );

User.prototype.validPassword = function(password) {
    password = password ? password : '';
    password = (password || '').toString().replace( /^\s+|\s+$/, '' );
    var pass = createPasswordHash( password, this.salt );
    return this.password === pass ? true : false;
};

User.prototype.fullName = function() {
    return this.first_name + ' ' + this.last_name;
};

/* Client Model */
Client.belongsTo( User, {as: 'user', foreignKey: 'user_id'} );
Client.hasMany( Token, {as: 'tokens', foreignKey: 'client_id'} );
Client.hasMany( Code, {as: 'codes', foreignKey: 'client_id'} );

Client.prototype.validSecret = function(secret) {
    return this.client_secret === secret ? true : false;
};

/* Token Model */
Token.belongsTo( User, {as: 'user', foreignKey: 'user_id'} );
Token.belongsTo( Token, {as: 'client', foreignKey: 'client_id'} );

/* Code Model */
Code.belongsTo( User, {as: 'user', foreignKey: 'user_id'} );
Code.belongsTo( Token, {as: 'client', foreignKey: 'client_id'} );