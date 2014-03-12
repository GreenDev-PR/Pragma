'use strict';

var db = require('../models');
var errors = require('errors');

/**
 *  Gets the specified user with
 */
exports.find = function (req, res, next) {
  var userId = req.params.userId;

  db.User.find(userId).then(function(user) {
    if(user) {
      res.json(user.getJSON());
    } else {
      next(new errors.Http404Error('User not found', 'User id is not in the database',
        'Supply an id that is in the database'));
    }
  }, function(err) {
    next(new errors.Http500Error(err.message));
  });

};

exports.create = function(req, res, next) {
  var body = req.body;
  delete body.id;

  var user = db.User.build(body);
  var userErrors = user.validate();
  if(userErrors) {
    next(new errors.ValidationError('Validation Error', userErrors,
        'Make the request with valid properties'));
  } else {

    db.User.find({where: {email: body.email}}).then(function(user) {
      if(user) {
        next(new errors.Http400Error('User already exists'));
      } else {
        // Hash the user's password and store it in the database.
        db.User.hashPassword(body.password, function(err, hashed) {
          if(err) {
            next(new errors.Http500Error('Server Error', err));
          } else {
            body.password = hashed;
            db.User.create(body).then(function(user) {
              res.json(201, user.getJSON());
            }, function(err) {
              next(new errors.Http500Error('Server Error', err));
            });
          }
        });
      }

    }, function(err) {
      next(new errors.Http500Error('Server Error', err));
    });
  }
};

exports.me = function(req, res, next) {
  var user = req.user;
  if(user) {
    res.json(user);
  } else {
    next(new errors.Http401Error());
  }
};
