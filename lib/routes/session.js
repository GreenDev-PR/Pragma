'use strict';

var session = require('../controllers/session');


module.exports = function(app) {
  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
};