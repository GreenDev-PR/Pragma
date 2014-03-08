'use strict';

var users = require('../controllers/users');

module.exports = function(app) {
  app.get('/api/users/:userId', users.find);
};
