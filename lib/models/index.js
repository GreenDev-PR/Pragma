'use strict';

var fs = require('fs'),
path = require('path'),
Sequelize = require('sequelize'),
lodash = require('lodash'),
config = require('../config/config'),
sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.sequelize),
db = {};

// Import each model and add it to the db variable.
fs.readdirSync(__dirname).forEach(function(file) {
  if (file !== 'index.js' && /(.*)\.(js$)/.test(file)) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  }
});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
