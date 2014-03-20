'use strict';

var cropType = require('../controllers/cropType');

module.exports = function(app) {
  app.get('/api/cropTypes', cropType.getAll);

  app.param('cropTypeId', cropType.find);
  app.get('/api/cropTypes/:cropTypeId', cropType.show);
};
