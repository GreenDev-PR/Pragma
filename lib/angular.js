'use strict';

var middleware = require('./middleware');
var index = require('./controllers/index');

module.exports = function(app) {
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};