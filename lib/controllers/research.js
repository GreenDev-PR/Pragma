'use strict';

var db = require('../models');
var errors = require('errors');

exports.getVariables = function(req, res, next) {
  db.GoesVariable.findAll().then(function(variables) {
    res.json(variables);
  }, function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

exports.getMapForVariable = function(req, res, next) {
  var variable = req.params.variableName;

  var maps = db.GoesMap.getLatest(variable);
  maps.then(function(map) {
    if(map) {
      res.json(map.values);
    } else {
      next(new errors.Http404Error('No data for ' + variable));
    }
  });

  maps.error(function(err) {
    next(new errors.DatabaseError(err.message));
  });

};
