'use strict';

var passport = require('passport');
var errors = require('errors');

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      next(new errors.Http500Error('Server Error', err));
    } else if(info){
      next(new errors.Http401Error('Unauthorized', info));
    } else {
      req.logIn(user, function(err) {
        if (err) {
          next(new errors.Http500Error('Server Error', err));
        } else {
          res.json(req.user);
        }
      });
    }

  })(req, res, next);
};
