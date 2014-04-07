'use strict';

var db = require('../models');
var errors = require('errors');
var _ = require('lodash');

/**
 * Gets a specified research variable
 */
exports.findVariable = function(req, res, next) {
  var variableName = req.params.variableName;

  db.GoesVariable.find({
    where: {
      variableName: variableName
    }
  }).then(function(variable) {
    if(variable) {
      req.variable = variable;
      next();
    } else {
      next(new errors.Http404Error('Variable does not exists', null, 'use /api/research/variables to get the available variables'));
    }
  }).error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

/**
 * Gets the list of all research variables
 */
exports.getVariables = function(req, res, next) {
  db.GoesVariable.findAll().then(function(variables) {
    res.json(variables);
  }, function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

/**
 * Gets the map(s) for the given variable name and date range
 */
exports.getMapForVariable = function(req, res, next) {
  var variable = req.variable.variableName;

  var mapsPromise = null;

  if(req.timeRange) {
    mapsPromise = db.GoesMap.getMapsBetween(variable, req.timeRange.startDate, req.timeRange.endDate);
  } else {
    mapsPromise = db.GoesMap.getLatest(variable);
  }

  mapsPromise.then(function(maps) {
    if(!_.isArray(maps)) {
      maps = [maps];
    }
    res.json(maps);
  });

  mapsPromise.error(function(err) {
    next(new errors.DatabaseError(err.message));
  });

};

/**
 * Gets the latest research data for a specified variable name
 */
exports.getDataForVariable = function(req, res, next) {
  var variable = req.variable.variableName;

  var valuesPromise = db.GoesData.getLatestValuesFor(variable);

  valuesPromise.then(function(values) {
    res.json(values);
  });

  valuesPromise.error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};
