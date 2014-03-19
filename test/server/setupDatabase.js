'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = require('../../lib/models');
var seedData = require('./seedData').data;
var _ = require('lodash');
var bcrypt = require('bcrypt');


module.exports = function(grunt, options, async) {
  var done = async();

  grunt.log.ok('Starting database setup');

  var promise = db.sequelize.authenticate()
  .then(function() {
    // allow postgres to increment id
    var userData = seedData.users;
    userData = userData.map(function(user) {
      var clone = _.cloneDeep(user);
      clone.password = bcrypt.hashSync(user.password, 8);
      delete clone.id;
      return clone;
    });

    return db.User.bulkCreate(userData);
  })
  .then(function() {
    return db.GoesVariable.bulkCreate(seedData.goesVariables);
  })
  .then(function() {
    return db.GoesMap.bulkCreate(seedData.goesMaps);
  })
  .then(function() {
    return db.GoesData.bulkCreate(seedData.goesData);
  })
  .then(function() {
    return db.CropType.bulkCreate(seedData.cropTypes);
  })
  .then(function() {
    return db.DefaultCropData.bulkCreate(seedData.defaultCropData);
  })
  .then(function() {
    return db.CropSession.bulkCreate(seedData.cropSessions);
  });

  promise.error(function(err) {
    grunt.fail.fatal(err);
  });

  promise.finally(done);

};
