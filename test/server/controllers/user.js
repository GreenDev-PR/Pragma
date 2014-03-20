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
      .end(helper.isBodyEqual(seedData.getUser(0), done));
    });

    it('should get a user with userId 6', function (done) {
      request(app)
      .get('/api/users/6')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helper.isBodyEqual(seedData.getUser(5), done));
    });

    it('should return 404 for a not found user', function(done) {
      request(app)
      .get('/api/users/' + seedData.users.length + 1)
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    it('should not return the user\'s password', function (done) {
      request(app)
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          done(err);
        } else {
          expect(res.body).not.to.have.property('password');
          done();
        }
      });
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
            expect(body.explanation).to.contain.keys(['email', 'userType']);
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
            expect(body.explanation).to.contain.keys(['farmerCoordinates']);
            done();
          }
        });
      });
    });

    describe('with a valid user object sent', function() {
      it('should create a user, disregard the given id and respond with a 201', function (done) {
        var expectedId = seedData.users.length + 1;
        var newUser = seed.factory.build('user');
        newUser.id = 30;
        post.send(newUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err) {
          if(err) {
            done(err);
          } else {
            request(app).get('/api/users/' + expectedId)
            .expect(200, done);
          }
        });

      });

      it('should not create a user with an existing same email', function(done) {
        var existingEmailUser = seed.factory.build('user', {email: seedData.users[0].email, userType: 'researcher'});
        post.send(existingEmailUser)
        .expect(400)
        .end(function(err, res) {
          if(err) {
            done(err);
          } else {
            expect(res.body.message).to.match(/exist/);
            console.log(res.body);
            done();
          }
        });

      });
    });
  });

  describe('crop sessions', function() {

    describe('get', function() {
      it('should bring all the crop sessions for a user', function(done) {
        request(app).get('/api/users/1/cropSessions')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(helper.isEqualWithoutIdAndTimestamps([seedData.cropSessions[0]], done));
      });
    });

    describe('find', function() {
      it('should bring a users specific crop session', function(done) {
        request(app).get('/api/users/1/cropSessions/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(helper.isEqualWithoutIdAndTimestamps(seedData.cropSessions[0], done));
      });

      it('should respond with 404 with an id not registered to a user', function(done) {
        request(app).get('/api/users/1/cropSessions/2')
        .expect('Content-Type', /json/)
        .expect(404, done);
      });
    });
  });
});
