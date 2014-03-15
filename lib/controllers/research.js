'use strict';

var db = require('../models');
var errors = require('errors');
var moment = require('moment');
var _ = require('lodash');

exports.getVariables = function(req, res, next) {
  db.GoesVariable.findAll().then(function(variables) {
    res.json(variables);
  }, function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

exports.getMapForVariable = function(req, res, next) {
  var variable = req.params.variableName;

  var mapsPromise = null;

  if(req.timeRange) {
    mapsPromise = db.GoesMap.getMapsBetween(variable, req.timeRange.startDate, req.timeRange.endDate);
  } else {
    mapsPromise = db.GoesMap.getLatest(variable);
  }

  mapsPromise.then(function(maps) {
    if(!_.isEmpty(maps)) {
      res.json(maps);
    } else {
      next(new errors.Http404Error('No maps for ' + variable));
    }
  });

  mapsPromise.error(function(err) {
    next(new errors.DatabaseError(err.message));
  });

};
