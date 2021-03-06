/**
 * Created by Alex on 12/27/13.
 */
"use strict";

var auth = require('trinte-auth')
    , config = require('../configuration')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , BasicStrategy = require('passport-http').BasicStrategy
    , ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
    , BearerStrategy = require('passport-http-bearer').Strategy;

/*  LocalStrategy */
passport.use(new LocalStrategy({
        usernameField: 'sign_login',
        passwordField: 'sign_password'
    },
    function (username, password, done) {
        User.findOne({
            username: username
        }).exec(function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done({
                        message: 'Incorrect username.',
                        code: 'invalid_username'
                    });
                }
                if (!user.validPassword(password)) {
                    return done({
                        message: 'Incorrect password.',
                        code: 'invalid_password'
                    });
                }
                return done(null, user);
            });
    }
));

/*  BasicStrategy */
passport.use(new BasicStrategy(
    function (client_id, client_secret, done) {
        Client.findById(client_id, function (err, client) {
            if (err) {
                return done(err);
            }
            if (client === null) {
                return done({
                    message: 'Unknown client',
                    code: 'invalid_client'
                });
            }
            if (!client.validSecret(client_secret)) {
                return done({
                    message: 'Incorrect client_secret',
                    code: 'invalid_client_secret'
                });
            }
            return done(null, client);
        });
    }
));

/*  ClientPasswordStrategy */
passport.use(new ClientPasswordStrategy(
    function (client_id, client_secret, done) {
        Client.findOne({
            active: 1,
            id: client_id
        }).exec(function (err, client) {
                if (err) {
                    return done(err);
                }
                if (client === null) {
                    return done({
                        message: 'Unknown client',
                        code: 'invalid_client'
                    });
                }
                if (!client.validSecret(client_secret)) {
                    return done({
                        message: 'Incorrect client_secret',
                        code: 'invalid_client_secret'
                    });
                }
                return done(null, client);
            });
    }
));

/*  BearerStrategy */
passport.use(new BearerStrategy(
    function (accessToken, done) {
        Token.findOne({
            access_token: accessToken
        }).exec(function (err, token) {
                if (err) {
                    return done(err);
                }
                if (token === null) {
                    return done({
                        message: 'Token not found',
                        code: 'invalid_token'
                    });
                }
                if (Math.round((token.expires_access - Date.now())) < 0) {
                    return done({
                        message: 'Token expired',
                        code: 'expired_token'
                    });
                }

                User.findById(token.user_id, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done({
                            message: 'Unknown user',
                            code: 'invalid_user'
                        });
                    }
                    var info = { scope: '*' };
                    done(null, user, info);
                });
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

auth.localAuth = function localAuth(path) {
    return passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: path || '/login',
        failureFlash: true,
        successFlash: 'Welcome!'
    });
};

auth.bearerAuth = function bearerAuth() {
    return passport.authenticate('bearer', {
        session: false
    });
};

auth.isAdmin = function isAdmin(path) {
    return  function (req, res, next) {
        var user = req.user || {};
        if (user && user.account_type) {
            if (user.account_type === 'admin') {
                next();
            } else {
                if (path) {
                    res.redirect(path);
                } else {
                    res.render('errors/403');
                }
            }
        } else {
            if (path) {
                res.redirect(path);
            } else {
                res.render('errors/403');
            }
        }
    };
};

auth.passport = passport;

module.exports = auth;