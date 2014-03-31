'use strict';

describe('Service: Session', function () {

  // load the service's module
  beforeEach(module('pragmaApp'));

  var credentials = {email: 't@t.com', password: 'ttt'};
  var user = {id:1, name: 'Victor', userType: 'farmer'};

  // instantiate service
  var Session, httpBackend, Restangular;
  beforeEach(inject(function ($injector) {
    Session = $injector.get('Session');
    httpBackend = $injector.get('$httpBackend');
    Restangular = $injector.get('Restangular');

    httpBackend.whenPOST('/api/session', credentials)
    .respond(200, user);

    httpBackend.whenDELETE('/api/session')
    .respond(200);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('initial state', function() {
    it('should have an empty user object', function() {
      expect(Session.user).toEqual({});
    });
  });

  describe('login', function() {
    it('should be able to login and store the user in the session', function() {
      Session.login(credentials).then(function(response) {
        expect(Restangular.stripRestangular(response)).toEqual(user);
        expect(Restangular.stripRestangular(Session.user)).toEqual(user);
      });
      httpBackend.flush();
    });

    it('should be able to logout the user and have an empty user object', function() {
      Session.login(credentials).then(function() {
        Session.logout().then(function() {
          expect(Session.user).toEqual({});
        });
      });

      httpBackend.flush(2);
    });

    describe('invalid credentials', function() {
      var invalidCredentials = {email: 't@t.com', password: 'ttttttt'};
      beforeEach(function() {
        httpBackend.whenPOST('/api/session', invalidCredentials)
        .respond(401);
      });

      it('should leave the user object empty', function() {
        Session.login(invalidCredentials).then(function() {
          expect(Session.user).toEqual({});
        });
        httpBackend.flush();
      });
    });
  });
});
