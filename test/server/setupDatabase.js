'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = require('../../lib/models');
var seed = require('./seedData');
var _ = require('lodash');


module.exports = function(grunt, options, async) {
  var done = async();

  grunt.log.ok('Starting database setup');

  db.sequelize.authenticate().then(function() {
    return db.sequelize.sync({force: true});
  }).then(function() {
    grunt.log.ok('Database tables created.');

    // allow postgres to increment id
    var userData = seed.data.users;
    userData = userData.map(function(user) {
      var clone = _.cloneDeep(user);
      delete clone.id;
      return clone;
    });

    return db.User.bulkCreate(userData);
  }, function(err) {
    grunt.log.error('Authentication', err);
    grunt.fail.fatal(err);
  }).then(function() {
    grunt.log.ok('Inserted users seed data');
    done();
  }, function(err) {
    grunt.fail.fatal(err);
  });

};
