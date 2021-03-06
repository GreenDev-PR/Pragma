'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app, passport) {

  var devConfig = function() {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.compress({
      level: 9
    }));
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  };

  app.configure('development', devConfig);
  app.configure('test', devConfig);

  app.configure('production', function() {
    app.use(express.compress({
      level: 9
    }));
    app.use(express.favicon(path.join(config.root, 'app', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
  });

  app.configure(function() {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    // keep sessions in memory for now
    app.use(express.session({secret: 'Pragma secret'}));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // Router needs to be last
    app.use(app.router);

    /* jshint unused: false */
    app.use(function(err, req, res, next) {
      res.json(err.status, err);
    });
  });
};
