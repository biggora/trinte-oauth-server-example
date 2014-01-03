### RESTFul server example

A fully RESTful server implementation for TrinteJS MVC Framework

#### status development

#### Features

* Multi database support: Redis, MongoDB, MySQL, SQLite, PostgreSQL, TingoDB
* OAuth 2.0 Access control
* Cluster mode

#### Requirements

* [NodeJS](http://nodejs.org/) v0.8+
* [TrinteJS](https://github.com/biggora/trinte) v0.1.3+
* [CaminteJS](https://github.com/biggora/caminte) v0.0.10+

#### How to use

* Clone source `git clone https://github.com/biggora/trinte-restful-server-example`
* Go to project dir `cd trinte-restful-server-example`
* Install deps `npm install`
* Install Trinte framework `npm install -g trinte`
* Run server `trinte s app.js`


#### Local Access control routes

##### Login

   https://{server}/login

##### Logout url

   https://{server}//logout


#### OAuth 2.0 Access control routes


##### Authorize

   https://{server}/oauth/authorize

##### Access Token

   https://{server}/oauth/access_token