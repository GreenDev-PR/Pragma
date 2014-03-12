'use strict';

var db = require('../models');

exports.getVariables = function(req, res) {
  db.GoesVariable.findAll().then(function(variables) {
    res.json(variables);
  }, function(err) {
    res.json(500, err);
  });
};
