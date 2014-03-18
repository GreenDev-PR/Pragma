'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = require('../../lib/models');
var seed = require('./seedData');
var _ = require('lodash');
var bcrypt = require('bcrypt');


module.exports = function(grunt, options, async) {
  var done = async();

  grunt.log.ok('Starting database setup');

  var promise = db.sequelize.authenticate().then(function() {
    return db.sequelize.sync({force: true});
  }, function(err) {
    grunt.log.error('Authentication', err);
    grunt.fail.fatal(err);
  })
  .then(function() {
    grunt.log.ok('Database tables created.');

    // allow postgres to increment id
    var userData = seed.data.users;
    userData = userData.map(function(user) {
      var clone = _.cloneDeep(user);
      clone.password = bcrypt.hashSync(user.password, 8);
      delete clone.id;
      return clone;
    });

    return db.User.bulkCreate(userData);
  })
  .then(function() {
    return db.GoesVariable.bulkCreate(seed.data.goesVariables);
  })
  .then(function() {
    return db.GoesMap.bulkCreate(seed.data.goesMaps);
  })
  .then(function() {
    return db.GoesData.bulkCreate(seed.data.goesData);
  });

  promise.error(function(err) {
    grunt.fail.fatal(err);
  });

  promise.finally(done);

};
