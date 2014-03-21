'use strict';

var request = require('supertest'),
expect = require('chai').expect,
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
_ = require('lodash'),
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

    describe('create', function() {
      it('should create the crop session', function(done) {
        var newCropSession = seed.factory.build('CropSession', {userId: 1});

        request(app).post('/api/users/1/cropSessions')
        .send(newCropSession)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(helper.isEqualWithoutIdAndTimestamps(newCropSession, done));
      });

      it('should always use the userId in the url', function(done) {
        var newCropSession = seed.factory.build('CropSession', {userId: 3000});
        var withRealId = _.clone(newCropSession);
        withRealId.userId = 1;
        request(app).post('/api/users/1/cropSessions')
        .send(newCropSession)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(helper.isEqualWithoutIdAndTimestamps(withRealId, done));
      });

      describe('with invalid attributes', function() {
        it('should respond with a 400', function(done) {
          var invalidCropSession = seed.factory.build('CropSession', {userId: 1, kcMid: 'Not a number'});
          request(app).post('/api/users/1/cropSessions')
          .send(invalidCropSession)
          .expect('Content-Type', /json/)
          .expect(400, done);
        });
      });
    });

    describe('irrigation event', function() {
      describe('get', function() {
        it('should return all the irrigation events', function(done) {
          request(app).get('/api/users/1/cropSessions/1/irrigationEvents')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(helper.isEqualWithoutIdAndTimestamps([seedData.irrigationEvents[0]], done));
        });
      });

      describe('create', function() {
        it('should create the irrigation event', function(done) {
          var newIrrigationEvent = seed.factory.build('IrrigationEvent', {cropSessionId: 1});

          request(app).post('/api/users/1/cropSessions/1/irrigationEvents')
          .send(newIrrigationEvent)
          .expect('Content-Type', /json/)
          .expect(201)
          .end(helper.isEqualWithoutIdAndTimestamps(newIrrigationEvent, done));
        });

        it('should always use the cropSessionId in the url', function(done) {
          var newIrrigationEvent = seed.factory.build('IrrigationEvent', {cropSessionId: 3000});
          var withRealId = _.clone(newIrrigationEvent);
          withRealId.cropSessionId = 1;
          request(app).post('/api/users/1/cropSessions/1/irrigationEvents')
          .send(newIrrigationEvent)
          .expect('Content-Type', /json/)
          .expect(201)
          .end(helper.isEqualWithoutIdAndTimestamps(withRealId, done));
        });
      });
    });
  });
});
