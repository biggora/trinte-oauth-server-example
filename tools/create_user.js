/**
 * Created by Alex on 12/31/13.
 */
"use strict";

var Helper = require('../app/helpers/ApplicationHelper');
var database = require('../config/database');
var Schema = require('caminte').Schema;
var schema = new Schema(database.db.driver, database.db);
var Client = require('../app/models/Client')(schema);
var User = require('../app/models/User')(schema);
var salt = Helper.uid(8);
var cleanPass = 'blackHorse';

// require( '../app/helpers/ModelsHelper' );

var dUser = {
    active: 1,
    username: 'ivan@server.com',
    salt: salt,
    password: Helper.createPasswordHash(cleanPass, salt),
    first_name: 'Ivan',
    last_name: 'Fedorov',
    photo: '',
    birthday: '1970-21-03',
    website: 'http://www.cenufiltrs.lv/',
    language: 'en',
    account_type: 'user'
};


console.log('###    Created User     ###');
console.log('===================================');

/* Create User */
User.findOrCreate({
    username: dUser.username
}, dUser, function (err, user) {
    if (user && !err) {
        console.log('           User +++');
        console.log('             id: ' + user.id);
        console.log('       username: ' + user.username);
        console.log('       password: ' + cleanPass);
        console.log('===================================');
    } else {
        console.log('Create User ERROR: ', err);
    }
});

