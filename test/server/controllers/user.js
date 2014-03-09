'use strict';

var request = require('supertest'),
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
app = require('../../../server');

describe('User controller', function () {

  describe('find', function () {
    it('should find a user with a userId 1', function(done) {
      request(app)
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helper.isBodyEqual(seedData.users[0], done));
    });

    it('should get a user with userId 6', function (done) {
      request(app)
      .get('/api/users/6')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helper.isBodyEqual(seedData.users[5], done));
    });

    it('should return 404 for a not found user', function(done) {
      request(app)
      .get('/api/users/' + seedData.users.length + 1)
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });

});
