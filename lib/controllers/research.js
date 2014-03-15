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
  var variable = req.params.variableName,
    startDate = req.query.startDate,
    endDate = req.query.endDate;

  var mapsPromise = null;

  if(startDate) {
    startDate = moment(startDate);
    endDate = moment(endDate);

    if(startDate.isValid() && endDate.isValid()) {
      mapsPromise = db.GoesMap.getMapsBetween(variable, startDate.toISOString(), endDate.toISOString());
    } else {
      return next(new errors.Http400Error('One of the supplied dates or both are invalid'));
    }
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
