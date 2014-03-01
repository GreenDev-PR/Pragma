'use strict';

var express = require('express'),
path = require('path'),
fs = require('fs'),
PgPromise = require('pgpromise'),
pg = require('pg');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var db = new PgPromise(pg, config.pg);


// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file).init(db);
  }
});

// Passport Configuration
var passport = require('./lib/config/passport');

// Express app
var app = express();

// Express settings
require('./lib/config/express')(app, passport);

// Bootstrap routes
var routesPath = path.join(__dirname, 'lib/routes');
fs.readdirSync(routesPath).forEach(function (file) {
  if (/(.*)\.(js$)/.test(file)) {
    require(routesPath + '/' + file)(app);
  }
});
// html5mode on in angular. Needs to be after bootstrapping the routes.
require('./lib/angular')(app);
// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;