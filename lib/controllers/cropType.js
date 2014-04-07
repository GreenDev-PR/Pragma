'use strict';

var CropType = require('../models').CropType;
var errors = require('errors');
var _ = require('lodash');

/**
 * Send all crop types, if error send database error message.
 */
exports.getAll = function(req, res, next) {
  CropType.findAll().then(function(cropTypes) {
    res.json(cropTypes);
  }).error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

/**
 * Find the requested crop type, or 404 if not found.
 */
exports.find = function(req, res, next) {
  CropType.find({ where: { id: req.params.cropTypeId } })
  .then(function(cropType) {
    if(cropType) {
      req.cropType = cropType;
      next();
    } else {
      next(new errors.Http404Error('Crop type not  found'));
    }
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

/**
 * Send the requested crop type.
 */
exports.show = function(req, res) {
  res.json(req.cropType);
};

// Crop data

/**
 * Sends requested crop data, if error send database error
 */
exports.getAllCropData = function(req, res, next) {
  req.cropType.getDefaultCropData().then(function(cropData) {
    res.json(cropData);
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

/**
 * Finds requested crop data, or 404 if it doesn't exist
 */
exports.findCropData = function(req, res, next) {
  req.cropType.getDefaultCropData({ where: { id: req.params.cropDataId } })
  .then(function(cropData) {
    if(!_.isEmpty(cropData)) {
      req.cropData = cropData[0];
      next();
    } else {
      next(new errors.Http404Error('Crop type not  found'));
    }
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

/**
 * Sends requested crop data.
 */
exports.showCropData = function(req, res) {
  res.json(req.cropData);
};
