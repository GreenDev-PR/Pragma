'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var farmerCredentials = {email: 'f@f.com', password: 'ff'};
  var researcherCredentials = {email: 'r@r.com', password: 'rr'};
  var DashboardCtrl,
    scope,
    Auth,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _Auth_) {
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;

    $httpBackend.whenPOST('/api/session', farmerCredentials)
    .respond({id:1, name: 'Victor', userType: 'farmer'});

    $httpBackend.whenPOST('/api/session', researcherCredentials)
    .respond({id:1, name: 'Victor', userType: 'researcher'});

    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should say that the user is a farmer', function () {
    Auth.login(farmerCredentials).then(function() {
      expect(scope.isFarmer()).toBe(true);
    });

    $httpBackend.flush();
  });

  it('should not be a farmer when the user is a researcher', function() {
    Auth.login(researcherCredentials).then(function() {
      expect(scope.isFarmer()).toBe(false);
    });

    $httpBackend.flush();
  });

  it('should not be a farmer when its not logged in', function() {
    expect(scope.isFarmer()).toBe(false);
  });
});
