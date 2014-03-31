'use strict';

describe('Controller: FarmerOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var coords = {latitude: 17.68, longitude: -65.45};
  var rainfallMap = {variableName: 'rainfall', imagePath: 'mapath'};

  var FarmerOverviewCtrl,
    scope,
    geolocation,
    $q,
    $timeout,
    Restangular,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _geolocation_, _$q_, $window, _Restangular_, _$timeout_) {
    // suppor for geolocation
    $window.navigator = {geolocation:true};
    geolocation = _geolocation_;
    $q = _$q_;
    Restangular = _Restangular_;
    $timeout = _$timeout_;

    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('/api/research/variables/rainfall/map')
    .respond([rainfallMap]);

    spyOn(geolocation, 'getLocation').and.callFake(function() {
      return $q.when({coords: coords});
    });

    scope = $rootScope.$new();
    FarmerOverviewCtrl = $controller('FarmerOverviewCtrl', {
      $scope: scope
    });

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('should get the latest rainfall map', function() {
    $httpBackend.flush();
    expect(Restangular.stripRestangular(scope.rainfallMap)).toEqual(rainfallMap);
  });
  describe('location', function() {
    beforeEach(function() {
      $httpBackend.flush();
    });

    it('should get the users location through geolocation', function() {
      $timeout.flush();
      expect(scope.location).toEqual(coords.latitude + ',' + coords.longitude);
    });
  });
});
