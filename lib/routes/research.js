'use strict';

var research = require('../controllers/research');
var middleware = require('../middleware');

module.exports = function(app) {
	
	// Research variables routes
  app.get('/api/research/variables', research.getVariables);
  app.param('variableName', research.findVariable);
  app.get('/api/research/variables/:variableName/map', middleware.setTimeRange, research.getMapForVariable);
  app.get('/api/research/variables/:variableName/data', middleware.setCoordinates, middleware.setTimeRange,
      research.getDataForVariable);
};
