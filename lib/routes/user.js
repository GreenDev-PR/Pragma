'use strict';

var users = require('../controllers/users');

module.exports = function(app) {
	// User routes
  app.post('/api/users', users.create);
  app.param('userId', users.find);
  app.get('/api/users/:userId', users.show);

  // Crop session routes
  app.get('/api/users/:userId/cropSessions', users.getCropSessions);
  app.post('/api/users/:userId/cropSessions', users.createCropSession);
  app.param('cropSessionId', users.findCropSession);
  app.get('/api/users/:userId/cropSessions/:cropSessionId', users.showCropSession);

  app.get('/api/users/:userId/cropSessions/:cropSessionId/calculateIrrigation', users.calculateIrrigation);

  // Irrigation event routes
  app.get('/api/users/:userId/cropSessions/:cropSessionId/irrigationEvents', users.getIrrigationEvents);
  app.post('/api/users/:userId/cropSessions/:cropSessionId/irrigationEvents', users.createIrrigationEvent);
};
