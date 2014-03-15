'use strict';

var middleware = require('./middleware');
var index = require('./controllers/index');
var errors = require('errors');

module.exports = function(app) {
  // All other routes to use Angular routing in app/scripts/app.js
  app.all('/api/*', function(req, res) {
    res.json(404, new errors.Http404Error());
  });

  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
