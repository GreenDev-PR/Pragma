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
