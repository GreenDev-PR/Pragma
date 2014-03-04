'use strict';

var user = require('../models/user');

/**
 * Create user
 */
 exports.create = function (req, res, next) {
  user.create(req.body).then(function(result) {
    res.json(201, result);
  }, function(err) {
    res.json(500, err);
  });
};

/**
 *  Get profile of specified user
 */
 exports.get = function (req, res, next) {
  var userId = req.params.id;
  
  user.get(userId).then(function(result) {
    res.json(result);
  });
};

/**
 * Get current user
 */
 exports.me = function(req, res) {
  res.json(req.user || null);
};