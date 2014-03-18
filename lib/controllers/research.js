'use strict';

var db = require('../models');
var errors = require('errors');

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

exports.getVariables = function(req, res, next) {
  db.GoesVariable.findAll().then(function(variables) {
    res.json(variables);
  }, function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

exports.getMapForVariable = function(req, res, next) {
  var variable = req.variable.variableName;

  var mapsPromise = null;

  if(req.timeRange) {
    mapsPromise = db.GoesMap.getMapsBetween(variable, req.timeRange.startDate, req.timeRange.endDate);
  } else {
    mapsPromise = db.GoesMap.getLatest(variable);
  }

  mapsPromise.then(function(maps) {
    res.json(maps);
  });

  mapsPromise.error(function(err) {
    next(new errors.DatabaseError(err.message));
  });

};

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
