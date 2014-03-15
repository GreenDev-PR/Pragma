'use strict';

var research = require('../controllers/research');
var middleware = require('../middleware');

module.exports = function(app) {
  app.get('/api/research/variables', research.getVariables);
  app.get('/api/research/variables/:variableName/map', middleware.setTimeRange, research.getMapForVariable);
};
