/**
 * Created by Alex on 12/27/13.
 */
var auth = require( 'trinte-auth' )
    , passport = require( 'passport' )
    , LocalStrategy = require( 'passport-local' ).Strategy
    , BasicStrategy = require( 'passport-http' ).BasicStrategy
    , ClientPasswordStrategy = require( 'passport-oauth2-client-password' ).Strategy
    , BearerStrategy = require( 'passport-http-bearer' ).Strategy;

/*  LocalStrategy */
passport.use( new LocalStrategy( {
        usernameField: 'sign_login',
        passwordField: 'sign_password'
    },
    function(username, password, done) {
        User.findOne( { email: username }, function(err, user) {
            if( err ) {
                return done( err );
            }
            if( !user ) {
                return done( null, false, { message: 'Incorrect username.' } );
            }
            if( !user.validPassword( password ) ) {
                return done( null, false, { message: 'Incorrect password.' } );
            }
            return done( null, user );
        } );
    }
) );

/*  BasicStrategy */
passport.use( new BasicStrategy(
    function(username, password, done) {
        console.log('BasicStrategy Start!');
        /*
        User.findOne( { email: username }, function(err, user) {
            if( err ) {
                return done( err );
            }
            if( !user ) {
                return done( null, false );
            }
            if( !user.validPassword(password) ) {
                return done( null, false );
            }
            console.log('BasicStrategy completed!');
            user.username = user.email;
            return done( null, user );
        } );
        */
        Client.findOne({ client_id: username }, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != password) { return done(null, false); }
            console.log('BasicStrategy completed!');
            return done(null, client);
        });
    }
) );

/*  ClientPasswordStrategy */
passport.use( new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        console.log('ClientPasswordStrategy Start!');
        Client.findOne( { client_id: clientId }, function(err, client) {
            if( err ) {
                return done( err );
            }
            if( !client ) {
                return done( null, false );
            }

            if( !client.validSecret(clientSecret) ) {
                return done( null, false );
            }
            console.log('ClientPasswordStrategy completed! ');
            return done( null, client );
        } );
    }
) );

/*  BearerStrategy */
passport.use( new BearerStrategy(
    function(accessToken, done) {
        console.log("BearerStrategy: ", accessToken)
        Token.findOne( { token: accessToken }, function(err, token) {
            if( err ) {
                return done( err );
            }
            if( !token ) {
                return done( null, false );
            }

            if( Math.round( (Date.now() - token.created) / 1000 ) > config.get( 'security:tokenLife' ) ) {
                Token.remove( { token: accessToken }, function(err) {
                    if( err ) return done( err );
                } );
                return done( null, false, { message: 'Token expired' } );
            }

            User.findById( token.userId, function(err, user) {
                if( err ) {
                    return done( err );
                }
                if( !user ) {
                    return done( null, false, { message: 'Unknown user' } );
                }
                var info = { scope: '*' }
                done( null, user, info );
            } );
        } );
    }
) );

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

auth.localAuth = function() {
    return passport.authenticate( 'local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: 'Welcome!'
    } );
};

auth.bearerAuth = function() {
    return passport.authenticate('bearer', {
        session: false
    });
};

auth.passport = passport;

module.exports = auth;