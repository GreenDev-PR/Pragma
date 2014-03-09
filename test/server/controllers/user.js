'use strict';

var request = require('supertest'),
expect = require('chai').expect,
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

  describe('create', function () {
    var post = null;
    beforeEach(function() {
      post = request(app).post('/api/users');
    });

    describe('with an invalid user object sent', function () {
      it('with an empty body should send 400', function (done) {
        post.send({})
        .expect('Content-Type', /json/)
        .expect(400, done);
      });

      it('with an existing email should send 400', function(done) {
        post.send(seed.factory.build('user', {email: seedData.users[0].email}))
        .expect(400, done);
      });

      it('with the invalid attrs should respond with 400 and a message with the incorrect attributes', function(done) {
        post.send(seed.factory.build('user', {email: 'not an email', userType: 'invalid userType'}))
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if(err) {
            done(err);
          } else {
            var body = res.body;
            expect(body.error).to.contain.keys(['email', 'userType']);
            done();
          }
        });
      });

      it('with userType being a farmer and no coordinates should respond with 400', function(done) {
        post.send(seed.factory.build('user', {userType: 'farmer', farmLatitude: null, farmLongitude: null}))
        .expect(400)
        .end(function(err, res) {
          if(err) {
            done(err);
          } else {
            var body = res.body;
            expect(body.error).to.contain.keys(['farmerCoordinates']);
            done();
          }
        });
      });
    });
  });
});
