'use strict';

var CropType = require('../models').CropType;
var errors = require('errors');

exports.getAll = function(req, res, next) {
  CropType.findAll().then(function(cropTypes) {
    res.json(cropTypes);
  }).error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};
