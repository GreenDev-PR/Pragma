'use strict';

var research = require('../controllers/research');

module.exports = function(app) {
  app.get('/api/research', research.getVariables);
};
