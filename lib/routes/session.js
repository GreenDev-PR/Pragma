'use strict';

var session = require('../controllers/session');


module.exports = function(app) {
  //Login and logout routes
  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
};