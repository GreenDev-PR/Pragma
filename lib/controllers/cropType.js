'use strict';

var CropType = require('../models').CropType;
var errors = require('errors');
var _ = require('lodash');

exports.getAll = function(req, res, next) {
  CropType.findAll().then(function(cropTypes) {
    res.json(cropTypes);
  }).error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

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

exports.show = function(req, res) {
  res.json(req.cropType);
};

// Crop data

exports.getAllCropData = function(req, res, next) {
  req.cropType.getDefaultCropData().then(function(cropData) {
    res.json(cropData);
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

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

exports.showCropData = function(req, res) {
  res.json(req.cropData);
};
