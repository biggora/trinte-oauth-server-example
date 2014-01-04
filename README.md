### OAuth 2.0 server server example

A OAuth 2.0 server implementation

#### status development

#### Features

* Multi database support: Redis, MongoDB, MySQL, SQLite, PostgreSQL, TingoDB

#### Requirements

* [NodeJS](http://nodejs.org/) v0.8+
* [TrinteJS](https://github.com/biggora/trinte) v0.1.3+
* [CaminteJS](https://github.com/biggora/caminte) v0.0.10+

#### How to use

* Clone source `git clone https://github.com/biggora/trinte-restful-server-example`
* Go to project dir `cd trinte-restful-server-example`
* Install Trinte framework `npm install -g trinte`
* Install dependencies `npm install`
* Run server `trinte s app.js`

#### Server routes

      # Access control routes

      # Local
      /login                    # login page uri
      /logout                   # logout uri

      # OAuth 2.0
      /oauth/authorize          # `Request for Permission` Dialog uri
      /oauth/access_token       # Access Token uri

      # Admin routes

      /admin                    # Admin dashboard uri
      /admin/users
      /admin/clients

