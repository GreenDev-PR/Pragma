'use strict';

var users = require('../controllers/users');

module.exports = function(app) {
  app.post('/api/users', users.create);
  app.get('/api/users/me', users.me);
  app.param('userId', users.find);
  app.get('/api/users/:userId', users.show);
};
