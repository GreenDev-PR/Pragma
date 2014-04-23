'use strict';

describe('Service: variables', function () {

  // load the service's module
  beforeEach(module('pragmaApp'));

  // instantiate service
  var variables, httpBackend, Restangular;
  beforeEach(inject(function($injector) {
    variables = $injector.get('variables');
    httpBackend = $injector.get('$httpBackend');
    Restangular = $injector.get('Restangular');
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getDataFor', function() {
    var rainfallData = [{
      variableName: 'rainfall',
      matrixRow: 0,
      matrixColumn: 1,
      dataValue: 1,
      latitude: 17.8,
      longitude: -65.3
    }];
    beforeEach(function() {
      httpBackend.whenGET('/api/research/variables/rainfall/data')
      .respond(200, rainfallData);
    });

    // it('should get the data for a specific variable', function() {
    //   httpBackend.expectGET('/api/research/variables/rainfall/data')
    //   .respond([]);
    //   variables.getDataFor('rainfall');
    //   httpBackend.flush();

    //   httpBackend.expectGET('/api/research/variables/aVar/data')
    //   .respond([]);
    //   variables.getDataFor('aVar');
    //   httpBackend.flush();
    // });

    // it('should return the rainfall data', function() {
    //   variables.getDataFor('rainfall').then(function(data) {
    //     expect(Restangular.stripRestangular(data)).toEqual(rainfallData);
    //   });

    //   httpBackend.flush();
    // });

  });

  describe('getMapsFor', function() {
    var mapData = [
      {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140101.jpg', 'dataDate': '2014-01-01'},
      {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140102.jpg', 'dataDate': '2014-01-02'}
    ];

    beforeEach(function() {
      httpBackend.whenGET('/api/research/variables/actual_ET/map')
      .respond(mapData);
    });

    it('should be able to get maps for rainfall', function() {
      httpBackend.expectGET('/api/research/variables/rainfall/map')
      .respond([]);
      variables.getMapsFor('rainfall');

      httpBackend.flush();
    });

    it('should be able to get maps for another variable', function() {
      httpBackend.expectGET('/api/research/variables/aVariable/map')
      .respond([]);
      variables.getMapsFor('aVariable');

      httpBackend.flush();
    });

    it('should return the map data', function() {
      variables.getMapsFor('actual_ET').then(function(data) {
        expect(Restangular.stripRestangular(data)).toEqual(mapData);
      });

      httpBackend.flush();
    });

    it('should request the data with a startDate', function() {
      httpBackend.expectGET('/api/research/variables/actual_ET/map?startDate=2014-01-01')
      .respond(200, []);
      variables.getMapsFor('actual_ET', '2014-01-01');
      httpBackend.flush();
    });

    it('should request the data with both a startDate and endDate', function() {
      httpBackend.expectGET('/api/research/variables/actual_ET/map?endDate=2014-01-10&startDate=2014-01-01')
      .respond(200, []);
      variables.getMapsFor('actual_ET', '2014-01-01', '2014-01-10');
      httpBackend.flush();
    });
  });

});
