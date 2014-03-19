'use strict';

var cropType = require('../controllers/cropType');

module.exports = function(app) {
  app.get('/api/cropTypes', cropType.getAll);
};
