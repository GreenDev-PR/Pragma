'use strict';

var db = require('../models');
var errors = require('errors');
var _ = require('lodash');
var path = require('path');

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

    _.forEach(maps, function(map) {
      map.dataValues.imagePath = 'http://spragma.ece.uprm.edu' + map.dataValues.imagePath;
    });
    console.log(maps);
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


  if(req.timeRange && req.coordinates) {
    db.GoesData.getValuesBetween(variable, req.timeRange.startDate, req.timeRange.endDate, req.coordinates).then(function(values) {
      res.json(values);
    })
    .error(function(err) {
      next(new errors.DatabaseError(err.message));
    });
  } else {
    next(new errors.Http400Error('Please specify the latitude and longitude and a timeRange'));
  }
};
