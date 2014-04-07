'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var farmerCredentials = {email: 'f@f.com', password: 'ff'};
  var researcherCredentials = {email: 'r@r.com', password: 'rr'};

  var DashboardCtrl;
  var scope;
  var Auth;
  var $httpBackend;
  var q;
  var CropSessions;
  var state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _Auth_, _CropSessions_, $q, $state) {
    $httpBackend = _$httpBackend_;
    Auth = _Auth_;

    $httpBackend.whenPOST('/api/session', farmerCredentials)
    .respond({id:1, name: 'Victor', userType: 'farmer'});

    $httpBackend.whenPOST('/api/session', researcherCredentials)
    .respond({id:1, name: 'Victor', userType: 'researcher'});

    $httpBackend.whenGET(/.*/).respond({});

    q = $q;
    state = $state;

    CropSessions = _CropSessions_;
    spyOn(CropSessions, 'getAll').and.callFake(function() {
      return $q.when([]);
    });

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

  it('should get the user cropsSessions', function() {
    Auth.login(farmerCredentials).then(function(){
      expect(CropSessions.getAll).toHaveBeenCalled();
    });
  });

  describe('logout', function() {
    beforeEach(function() {
      spyOn(state, 'go').and.returnValue({});

      spyOn(Auth, 'logout').and.returnValue(q.when({}));
    });

    it('should call auth logout and go to the the landingPage', function() {
      scope.logout();
      scope.$apply();
      expect(state.go).toHaveBeenCalledWith('landingPage');
      expect(Auth.logout).toHaveBeenCalled();
    });
  });
});
