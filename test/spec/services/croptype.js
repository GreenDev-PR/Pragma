'use strict';

describe('Service: CropType', function () {

  // load the service's module
  beforeEach(module('pragmaApp'));

  var cropTypeEndpoint = '/api/cropTypes';

  var cropTypes;

  // instantiate service
  var CropTypes;
  var httpBackend;
  beforeEach(inject(function (_CropTypes_, $httpBackend) {
    cropTypes = [
      {id:1, 'cropType':'Avocado'},
      {id:2, 'cropType':'Broccoli'},
      {id:3, 'cropType':'Cabbage'}
    ];

    CropTypes = _CropTypes_;
    httpBackend = $httpBackend;

    httpBackend.whenGET(cropTypeEndpoint)
    .respond(cropTypes);
  }));

  describe('getAll', function() {
    it('should get the data from the right url', function() {
      httpBackend.expectGET(cropTypeEndpoint);
      CropTypes.getAll();
      httpBackend.flush();
    });
  });

  describe('get', function() {
    it('should get the cropType with id 1', function() {
      httpBackend.expectGET(cropTypeEndpoint+'/1')
      .respond(CropTypes[0]);
      CropTypes.get(1);
      httpBackend.flush();
    });

    it('should get the cropType with id 3', function() {
      httpBackend.expectGET(cropTypeEndpoint+'/3')
      .respond(CropTypes[2]);
      CropTypes.get(3);
      httpBackend.flush();
    });

    describe('the crop data', function() {
      it('should request the cropData of the given cropType id', function() {
        httpBackend.expectGET(cropTypeEndpoint + '/2/cropData')
        .respond([0]);
        CropTypes.getCropData(2);
        httpBackend.flush();
      });
    });
  });

  describe('getCropType', function() {
    it('should be return the cropType', function() {
      expect(CropTypes.getCropType(2, cropTypes)).toEqual(cropTypes[1]);
    });

    it('should return null if the id is not found', function() {
      expect(CropTypes.getCropType(3000, cropTypes)).toBe(null);
    });
  });
});
