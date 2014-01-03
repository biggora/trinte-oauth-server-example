/**
 * Created by Alex on 12/26/13.
 */
/**
 * Module dependencies.
 */
var oauth2orize = require( 'oauth2orize' )
    , auth = require( './login' )
    , utils = require( './../../app/lib/utils' )
    , config = require( '../configuration' );

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient( function(client, done) {
    return done( null, client.id );
} );

server.deserializeClient( function(id, done) {
    Client.findById( id, function(err, client) {
        if( err ) {
            return done( err );
        }
        return done( null, client );
    } );
} );

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

// Grant authorization codes.  The callback takes the `client` requesting
// authorization, the `redirectURI` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a code, which is bound to these
// values, and will be exchanged for an access token.

server.grant( oauth2orize.grant.code( function(client, redirect_uri, user, scope, done) {
    console.log( 'Grant code' )
    if( !client.validGrant( 'authorization_code' ) ) {
        return done( { message: 'Incorrect grant_type. Allowed types: ' + client.grant_types } );
    }
    Code.remove( {
        where: {
            client_id: client.id,
            expires: {
                lt: new Date().getTime()
            }
        } }, function(err) {
        if( err ) return done( err );
        createAuthCode( client, user, redirect_uri, scope, done );
    } );
} ) );

// Grant implicit authorization.  The callback takes the `client` requesting
// authorization, the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a token, which is bound to these
// values.

server.grant( oauth2orize.grant.token( function(client, user, scope, done) {
    console.log( 'Grant token' )
    if( !client.validGrant( 'token' ) ) {
        return done( { message: 'Incorrect grant_type. Allowed types: ' + client.grant_types } );
    }
    createToken( client, scope, done );
} ) );

// Exchange authorization codes for access tokens.  The callback accepts the
// `client`, which is exchanging `code` and any `redirectURI` from the
// authorization request for verification.  If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.

server.exchange( oauth2orize.exchange.code( function(client, code, redirect_uri, done) {
    console.log( 'Exchange code', client.id, code, redirect_uri )
    if( !client.validGrant( 'authorization_code' ) ) {
        return done( { message: 'Incorrect grant_type. Allowed types: ' + client.grant_types } );
    }
    if( !redirect_uri ) {
        return done( { message: 'redirect_uri parameter is missing.' } );
    }

    Code.findOne( {
        authorization_code: code.toString(),
        expires: {
            gte: new Date().getTime()
        }
    } ).exec( function(err, authCode) {
            if( err ) {
                return done( err );
            }
            if( !authCode ) {
                return done( { message: 'Unknown Authorization code.' } );
            }
            if( client.id !== authCode.id ) {
                return done( { message: 'Incorrect client_id.' } );
            }
            if( !authCode.validRedirect( redirect_uri ) ) {
                return done( { message: 'Incorrect redirect_uri.' } );
            }
            authCode.destroy( function(err) {
                createToken( authCode, authCode.scope, done );
            } );
        } );
} ) );

// Exchange user id and password for access tokens.  The callback accepts the
// `client`, which is exchanging the user's name and password from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the user who authorized the code.

server.exchange( oauth2orize.exchange.password( function(client, username, password, scope, done) {
    console.log( 'Exchange password!' )
    if( !client.validGrant( 'password' ) ) {
        return done( { message: 'Incorrect grant_type. Allowed types: ' + client.grant_types } );
    }
    //Validate the client
    Client.findOne( {
        id: client.id
    } ).exec( function(err, localClient) {
            if( err ) {
                return done( err );
            }
            if( localClient === null ) {
                return done( { message: 'Unknown Client.' } );
            }
            if( localClient.active !==  1) {
                return done( { message: 'Client disabled.' } );
            }
            if( !localClient.validSecret( client.client_secret ) ) {
                return done( { message: 'Incorrect client_secret.' } );
            }
            //Validate the user
            User.findOne( {
                username: username
            }, function(err, user) {
                if( err ) {
                    return done( err );
                }
                if( user === null ) {
                    return done( { message: 'Unknown User.' } );
                }
                if( user.active !== 1 ) {
                    return done( { message: 'User disabled.' } );
                }
                if( !user.validPassword( password ) ) {
                    return done( { message: 'Incorrect user password.' } );
                }
                createToken( client, scope, done );
            } );
        } );
} ) );

// Exchange the client id and password/secret for an access token.  The callback accepts the
// `client`, which is exchanging the client's id and password/secret from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the client who authorized the code.

server.exchange( oauth2orize.exchange.clientCredentials( function(client, scope, done) {
    console.log( 'Exchange clientCredentials' )
    if( !client.validGrant( 'client_credentials' ) ) {
        return done( { message: 'Incorrect grant_type. Allowed types: ' + client.grant_types } );
    }
    //Validate the client
    Client.findOne( {
        id: client.client_id
    }, function(err, localClient) {
        if( err ) {
            return done( err );
        }
        if( localClient === null ) {
            return done( { message: 'Unknown Client.' } );
        }
        if( localClient.active !==  1) {
            return done( { message: 'Client disabled.' } );
        }
        if( !localClient.validSecret( client.client_secret ) ) {
            return done( { message: 'Incorrect client_secret.' } );
        }
        createToken( client, scope, done );
    } );
} ) );

// Exchange refreshToken for access token.
server.exchange( oauth2orize.exchange.refreshToken( function(client, refreshToken, scope, done) {
    console.log( 'Exchange refreshToken' )
    if( !client.validGrant( 'refresh_token' ) ) {
        return done( { message: 'Incorrect grant_type. Allowed types: ' + client.grant_types } );
    }
    Token.findOne( {
        refresh_token: refreshToken
    } ).exec( function(err, token) {
            if( err ) {
                return done( err );
            }
            if( !token ) {
                return done( { message: 'Token not found.' } );
            }

            User.findById( token.user_id, function(err, user) {
                if( err ) {
                    return done( err );
                }
                if( !user ) {
                    return done( { message: 'User not found.' } );
                }

                token.destroy( function(err) {
                    if( err ) return done( err );
                    Token.remove( {
                        where: {
                            client_id: client.id,
                            expires: {
                                lt: new Date().getTime()
                            }
                        } }, function(err) {
                        if( err ) return done( err );
                        createToken( client, scope || client.scope, done );
                    } );
                } );
            } );
        } );
} ) );

// user authorization endpoint
//
// `authorization` middleware accepts a `validate` callback which is
// responsible for validating the client making the authorization request.  In
// doing so, is recommended that the `redirectURI` be checked against a
// registered value, although security requirements may vary accross
// implementations.  Once validated, the `done` callback must be invoked with
// a `client` instance, as well as the `redirectURI` to which the user will be
// redirected after an authorization decision is obtained.
//
// This middleware simply initializes a new authorization transaction.  It is
// the application's responsibility to authenticate the user and render a dialog
// to obtain their approval (displaying details about the client requesting
// authorization).  We accomplish that here by routing through `ensureLoggedIn()`
// first, and rendering the `dialog` view.

exports.authorization = server.authorization( function(client_id, redirect_uri, done) {
    console.log( 'Server Authorization!' )
    Client.findById( client_id, function(err, client) {
        if( err ) {
            return done( err );
        }
        if( client === null ) {
            return done( { message: 'Unknown Client.' } );
        }
        if( client.active !==  1) {
            return done( { message: 'Client disabled.' } );
        }
        if( !client.validSecret( client.client_secret ) ) {
            return done( { message: 'Incorrect client_secret.' } );
        }

        // WARNING: For security purposes, it is highly advisable to check that
        //          redirect_uri provided by the client matches one registered with
        //          the server.  For simplicity, this example does not.  You have
        //          been warned.
        if( !client.validRedirect( redirect_uri ) ) {
            return done( { message: 'Incorrect redirect_uri.' } );
        }
        return done( null, client, redirect_uri );
    } );
} );

// user decision endpoint
//
// `decision` middleware processes a user's decision to allow or deny access
// requested by a client application.  Based on the grant type requested by the
// client, the above grant middleware configured above will be invoked to send
// a response.

exports.decision = server.decision();

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
    auth.passport.authenticate( ['basic', 'oauth2-client-password'], { session: false } ),
    server.token(),
    server.errorHandler()
]

function createToken(client, scope, done) {
    var aToken = utils.uid( config.oauth.token_len ).toString( 'base64' );
    var rToken = utils.uid( 24 ).toString( 'base64' );
    var expires = new Date().getTime() + (config.oauth.token_live * 1000);
    var nToken = new Token( {
        access_token: aToken,
        refresh_token: rToken,
        client_id: client.id,
        user_id: client.user_id,
        scope: scope || '*',
        expires: expires
    } );
    nToken.save( function(err) {
        if( err ) {
            return done( err );
        }
        done( null, aToken, rToken, {
            expires_in: config.oauth.token_live,
            scope: nToken.scope
        } );
    } );
}


function createAuthCode(client, user, redirect_uri, scope, done) {
    var code = utils.uid( config.oauth.code_len );
    var expires = new Date().getTime() + (config.oauth.code_live * 1000);
    var nCode = new Code( {
        authorization_code: code,
        client_id: client.id,
        user_id: user.id || client.user_id,
        redirect_uri: redirect_uri,
        expires: expires,
        scope: scope || client.scope || '*'
    } );
    nCode.save( function(err) {
        if( err ) {
            return done( err );
        }
        done( null, code );
    } );
}

