'use strict';

var db = require('../models');

/**
 *  Gets the specified user with
 */
exports.find = function (req, res, next) {
  var userId = req.params.userId;
  db.User.find(userId).then(function(user) {
    if(user) {
      res.json(user.values);
    } else {
      res.json(404, {message: 'User with userId ' + userId + ' not found'});
    }
  }, next);
};

exports.create = function(req, res) {
  var body = req.body;
  var user = db.User.build(body);
  var errors = user.validate();
  if(errors) {
    res.json(400, {error: errors, message: 'validation error'});
  } else {
    db.User.findOrCreate({email: body.email}, body).spread(function(user, created) {
      console.log('user create args', arguments);
      if(created) {
        res.json(201, user);
      } else {
        res.json(400, {message: 'User exists'});
      }
    }, function(err) {
      console.log(err);
      res.json(500, err);
    });
  }
};
