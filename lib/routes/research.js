'use strict';

var research = require('../controllers/research');

module.exports = function(app) {
  app.get('/api/research/variables', research.getVariables);
  app.get('/api/research/variables/:variableName/map', research.getMapForVariable);
};
