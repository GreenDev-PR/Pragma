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
    next(new errors.DatabaseError(err.mess));
  });

};

exports.create = function(req, res, next) {
  var body = req.body;
  delete body.id;

  var user = db.User.build(body);
  var userErrors = user.validate();
  if(userErrors) {
    next(new errors.ValidationError(null, userErrors));
  } else {

    db.User.find({where: {email: body.email}}).then(function(user) {
      if(user) {
        next(new errors.Http400Error('User already exists'));
      } else {

        // Hash the user's password and store it in the database.
        db.User.hashPassword(body.password).then(function(hashed) {
          body.password = hashed;
          return db.User.create(body);
        }).then(function(user) {
          res.json(201, user.getJSON());
        }).error(function(err) {
          next(new errors.DatabaseError(err.message));
        });
      }

    }).error(function(err) {
      next(new errors.DatabaseError(err.message));
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
