'use strict';

var request = require('supertest'),
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
app = require('../../../server');

var Session = require('supertest-session')({
  app: app
});

describe('Session controller', function () {
  describe('login', function () {
    var login = null;
    beforeEach(function() {
      login = request(app).post('/api/session');
    });

    // it('should be able login an existing user', function (done) {
    //   var user = seedData.users[0];

    //   login
    //   .send({email: user.email, password: user.password})
    //   .expect('Content-Type', /json/)
    //   .expect(200)
    //   .end(helper.isBodyEqual(seedData.getUser(0), done));
    // });

    it('should respond with 401 when a not registered user is sent', function (done) {
      var user = seedData.users[0];
      login
      .send({email:'notindb@matest.com', password: user.password})
      .expect(401, done);
    });

    it('should respond with a when an incorrect password is sent 401', function(done) {
      var user = seedData.users[0];
      login
      .send({email: user.email, password: 'wrong password'})
      .expect('Content-Type', /json/)
      .expect(401, done);
    });

    it('should respond with a 401 when an empty body is sent', function (done) {
      login.send()
      .expect(401, done);
    });

    describe('needs to persist the session', function () {
      var user = seedData.users[0];
      before(function(done) {
        this.sess = new Session();
        this.sess.post('/api/session')
        .send({email: user.email, password: user.password})
        .expect(200, done);
      });

      after(function() {
        this.sess.destroy();
      });

      it('should allow me to request myself after being logged in', function (done) {
        this.sess.get('/api/users/me')
        .expect(200)
        .end(helper.isBodyEqual(seedData.getUser(0), done));
      });
    });
  });

  describe('logout', function () {
    describe('with a user logged in', function () {
      var user = seedData.users[0];
      beforeEach(function(done) {
        this.sess = new Session();
        this.sess.post('/api/session')
        .send({email: user.email, password: user.password})
        .expect(200, done);
      });

      afterEach(function() {
        this.sess.destroy();
      });

      it('should destroy the session after log out', function (done) {
        var sess = this.sess;
        this.sess.del('/api/session')
        .expect(200)
        .end(function(err) {
          if(err) {
            done(err);
          } else {
            sess.get('/api/users/me')
            .expect(401, done);
          }
        });
      });

    });
  });
});














