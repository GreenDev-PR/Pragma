'use strict';

var users = require('../controllers/users');

module.exports = function(app) {
  app.post('/api/users', users.create);
  app.get('/api/users/me', users.me);
  app.param('userId', users.find);
  app.get('/api/users/:userId', users.show);

  app.get('/api/users/:userId/cropSessions', users.getCropSessions);
  app.post('/api/users/:userId/cropSessions', users.createCropSession);
  app.param('cropSessionId', users.findCropSession);
  app.get('/api/users/:userId/cropSessions/:cropSessionId', users.showCropSession);
};
