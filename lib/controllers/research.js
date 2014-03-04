'use strict';

var research = require('../models/research');

exports.getVariables = function(req, res, next) {
  res.json([{name:'weather_var', description: 'its a weather_var'}]);
};

exports.getDataForVariable = function(req, res, next) {
  res.json({name: 'variable', data: [1,2,3,4]});
};
