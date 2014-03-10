'use strict';

var db = require('../models');

/**
 *  Gets the specified user with
 */
exports.find = function (req, res, next) {
  var userId = req.params.userId;
  db.User.find(userId).then(function(user) {
    if(user) {
      delete user.values.password;
      res.json(user.values);
    } else {
      res.json(404, {message: 'User with userId ' + userId + ' not found'});
    }
  }, next);
};

exports.create = function(req, res) {
  var body = req.body;
  delete body.id;

  var user = db.User.build(body);
  var errors = user.validate();
  if(errors) {
    res.json(400, {error: errors, message: 'validation error'});
  } else {
    db.User.find({where: {email: body.email}}).then(function(user) {
      if(user) {
        res.json(400, {message: 'Email already exists'});
      } else {

        db.User.hashPassword(body.password, function(err, hashed) {
          if(err) {
            res.json(500, err);
          } else {
            body.password = hashed;
            db.User.create(body).then(function(user) {
              delete user.values.password;
              res.json(201, user.values);
            }, function(err) {
              res.json(500, err);
            });
          }
        });
      }

    }, function(err) {
      res.json(500, err);
    });
  }
};
