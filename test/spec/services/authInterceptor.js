'use strict';

describe('Service: Auth Interceptor', function() {
  // load the service's module
  beforeEach(module('pragmaApp'));

  // instantiate service
  var AuthInterceptor, rootScope, httpBackend, AUTH_EVENTS, $http;
  beforeEach(inject(function ($injector) {
    AuthInterceptor = $injector.get('AuthInterceptor');
    rootScope = $injector.get('$rootScope');
    httpBackend = $injector.get('$httpBackend');
    AUTH_EVENTS = $injector.get('AUTH_EVENTS');
    $http = $injector.get('$http');

    httpBackend.whenGET('/api/notAuthenticated').respond(401, {});
    httpBackend.whenGET('/api/notAuthorized').respond(403, {});

    spyOn(rootScope, '$broadcast').and.callThrough();
  }));

  it('should broadcast notAuthenticated when the status is 401', function() {
    $http.get('/api/notAuthenticated').catch(function(response) {
      expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.notAuthenticated, response);
    });
    httpBackend.flush();
  });

  it('should broadcast not', function() {
    $http.get('/api/notAuthorized').catch(function(response) {
      expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.notAuthorized, response);
    });
    httpBackend.flush();
  });
});
