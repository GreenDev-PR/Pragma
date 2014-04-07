'use strict';

var cropType = require('../controllers/cropType');

module.exports = function(app) {
	
  // Crop type routes
  app.get('/api/cropTypes', cropType.getAll);

  app.param('cropTypeId', cropType.find);
  app.get('/api/cropTypes/:cropTypeId', cropType.show);

  // Crop data routes
  app.get('/api/cropTypes/:cropTypeId/cropData', cropType.getAllCropData);
  app.param('cropDataId', cropType.findCropData);
  app.get('/api/cropTypes/:cropTypeId/cropData/:cropDataId', cropType.showCropData);

};
