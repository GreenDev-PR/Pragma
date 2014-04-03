'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('pragmaApp'));

  var credentials = {email: 't@t.com', password: 'ttt'};
  var user = {id:1, name: 'Victor', userType: 'farmer'};
  // var invalidCredentials = {email: 't@t.com', password: 'ttttt'};

  // instantiate service
  var Auth;
  var Restangular;
  var rootScope;
  var AUTH_EVENTS;
  var USER_ROLES;
  var Session;
  var $q;

  var mockSessionValid = function () {
    spyOn(Session, 'login').and.callFake(function() {
      Session.user = user;
      return $q.when(user);
    });

    spyOn(Session, 'logout').and.callFake(function() {
      return $q.when({});
    });
  };

  var mockSessionInvalid = function() {
    spyOn(Session, 'login').and.callFake(function() {
      return $q.reject('An error');
    });
  };

  beforeEach(inject(function ($injector) {
    Auth = $injector.get('Auth');
    // httpBackend = $injector.get('$httpBackend');
    Restangular = $injector.get('Restangular');
    rootScope = $injector.get('$rootScope');
    AUTH_EVENTS = $injector.get('AUTH_EVENTS');
    USER_ROLES = $injector.get('USER_ROLES');
    Session = $injector.get('Session');
    $q = $injector.get('$q');

  }));

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

  // describe('authentication events', function() {
  //   beforeEach(function() {
  //     spyOn(rootScope, '$broadcast').and.callThrough();
  //   });

  //   describe('with valid credentials', function() {
  //     beforeEach(function() {
  //       mockSessionValid();
  //     });

  //     it('should broadcast loginSuccess on user login', function() {
  //       Auth.login(credentials).then(function(user) {
  //         expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.loginSuccess, user);
  //       });
  //       rootScope.$apply();

  //     });

  //     it('should broadcast logoutSuccess on logout', function() {
  //       Auth.logout().then(function() {
  //         expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.logoutSuccess);
  //       });
  //       rootScope.$apply();
  //     });
  //   });

  //   describe('with invalid credentials', function() {
  //     beforeEach(function() {
  //       mockSessionInvalid();
  //     });

  //     it('should broadcast loginFailed', function() {
  //       Auth.login(invalidCredentials).then(null, function() {
  //         console.log('ima here');
  //         expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.loginFailed);
  //       });
  //       // Auth.login(invalidCredentials).catch;
  //       rootScope.$apply();
  //       console.log('dmsdsmfsfsldf');
  //       expect(true).toBe(false);
  //       // expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.loginFailed);
  //     });
  //   });
  // });

  describe('login', function() {
    var login;
    beforeEach(function() {
      mockSessionValid();
      login = Auth.login(credentials);
    });

    it('should be able to login and say that the user is authenticated', function() {
      login.then(function() {
        expect(Auth.isAuthenticated()).toBe(true);
      });
      rootScope.$apply();

    });

    it('should say that the farmer is authorized', function() {
      login.then(function() {
        expect(Auth.isAuthorized([USER_ROLES.farmer])).toBe(true);
      });
      rootScope.$apply();
    });

    it('should have the user role of a farmer', function() {
      login.then(function() {
        Auth.hasRole(USER_ROLES.farmer);
      });
      rootScope.$apply();
    });
  });

  describe('login with invalid credentials', function() {
    beforeEach(function() {
      mockSessionInvalid();
    });

    // it('should say not authenticated', function() {
    //   Auth.login(invalidCredentials).catch(function() {
    //     expect(Auth.isAuthenticated()).toBe(false);
    //   });
    //   rootScope.$apply();
    // });

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
