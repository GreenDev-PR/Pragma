'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('pragmaApp'));

  var credentials = {email: 't@t.com', password: 'ttt'};
  var user = {id:1, name: 'Victor', userType: 'farmer'};
  var invalidCredentials = {email: 't@t.com', password: 'ttttt'};

  // instantiate service
  var Auth,
    httpBackend,
    Restangular,
    rootScope,
    AUTH_EVENTS,
    USER_ROLES;
  beforeEach(inject(function ($injector) {
    Auth = $injector.get('Auth');
    httpBackend = $injector.get('$httpBackend');
    Restangular = $injector.get('Restangular');
    rootScope = $injector.get('$rootScope');
    AUTH_EVENTS = $injector.get('AUTH_EVENTS');
    USER_ROLES = $injector.get('USER_ROLES');


    httpBackend.whenPOST('/api/session', credentials)
    .respond(200, user);

    httpBackend.whenPOST('/api/session', invalidCredentials)
    .respond(401);

    httpBackend.whenDELETE('/api/session')
    .respond(200);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('initial state', function() {
    it('should have a role of guest', function() {
      Auth.hasRole(USER_ROLES.guest);
    });

    it('should not be authenticated', function() {
      expect(Auth.isAuthenticated()).toBe(false);
    });

    it('should have a guest user role', function() {
      expect(Auth.getUserRole()).toEqual(USER_ROLES.guest);
    });

    it('should be authorized to access pages with a guest user role in them', function() {
      expect(Auth.isAuthorized([USER_ROLES.guest])).toBe(true);
    });
  });

  describe('authentication events', function() {
    beforeEach(function() {
      spyOn(rootScope, '$broadcast').and.callThrough();
    });

    it('should broadcast loginSuccess on user login', function() {
      Auth.login(credentials).then(function(user) {
        expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.loginSuccess, user);
      });
      httpBackend.flush();
    });

    it('should broadcast logoutSuccess on logout', function() {
      Auth.logout().then(function() {
        expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.logoutSuccess);
      });
      httpBackend.flush();
    });

    describe('with invalid credentials', function() {
      it('should broadcast loginFailed', function() {
        Auth.login(invalidCredentials).catch(function(err) {
          expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.loginFailed, err);
        });
        httpBackend.flush();
      });
    });
  });

  describe('login', function() {
    var login;
    beforeEach(function() {
      login = Auth.login(credentials);
    });

    it('should be able to login and say that the user is authenticated', function() {
      login.then(function() {
        expect(Auth.isAuthenticated()).toBe(true);
      });
      httpBackend.flush();
    });

    it('should say that the farmer is authorized', function() {
      login.then(function() {
        expect(Auth.isAuthorized(['farmer'])).toBe(true);
      });
      httpBackend.flush();
    });

    it('should have the user role of a farmer', function() {
      login.then(function() {
        Auth.hasRole(USER_ROLES.farmer);
      });
      httpBackend.flush();
    });
  });

  describe('login with invalid credentials', function() {
    it('should say not authenticated', function() {
      Auth.login(invalidCredentials).catch(function() {
        expect(Auth.isAuthenticated()).toBe(false);
      });
      httpBackend.flush();
    });

    it('should have a guest role', function() {
      expect(Auth.hasRole(USER_ROLES.guest)).toBe(true);
      expect(Auth.hasRole(USER_ROLES.farmer)).toBe(false);
    });

    it('should not be authorized to access the other roles', function() {
      expect(Auth.isAuthorized([USER_ROLES.farmer, USER_ROLES.researcher])).toBe(false);
    });

    it('should be authorized if the guest roles is in the authorizedRoles', function() {
      expect(Auth.isAuthorized([USER_ROLES.farmer, USER_ROLES.researcher, USER_ROLES.guest])).toBe(true);
    });
  });
});
