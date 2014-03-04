'use strict';

var request = require('supertest'),
app = require('../../../server');

describe('User controller', function () {

  describe('get', function () {
    it('should get a user with a userId vitin', function(done) {
      var expectedResponse = [
        {
          'username': 'victor@test.com',
          'password': 'plain text pwd',
          'name': 'vitin',
          'lastname': 'viteque',
          'email': 'maemail',
          'farm_latitude': 18.7944,
          'farm_longitude': 17.3255
        }
      ];

      request(app)
        .get('/api/users/vitin')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expectedResponse, done);
    });

    it('should get a user with userId miguel', function (done) {
      var expectedResponse = [
        {
          'username': 'mig@test.com',
          'password': 'alsalfd',
          'name': 'miguel',
          'lastname': 'migueque',
          'email': 'fflsdlfsdl',
          'farm_latitude': null,
          'farm_longitude': null
        }
      ];

      request(app)
        .get('/api/users/miguel')
        .expect('Content-Type', /json/)
        .expect(200, expectedResponse, done);
    });
  });
  
  describe('create', function () {
    it('shoudl create a user and respond with a 201', function (done) {
      request(app).post('/api/users')
        .send({email: 'test@test.com', password: 'testpwd'})
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });
});