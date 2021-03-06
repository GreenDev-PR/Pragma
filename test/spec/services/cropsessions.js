'use strict';

describe('Service: CropSessions', function () {

  // load the service's module
  beforeEach(module('pragmaApp'));

  var cropSessions;
  var cropSessionEndpoint = '/api/users/me/cropSessions';

  // instantiate service
  var CropSessions;
  var httpBackend;
  beforeEach(inject(function (_CropSessions_, $httpBackend) {
    cropSessions = [
      {
        id: 1,
        userId: 1,
        cropName: 'CropName1',
        cropTypeId: 1,
        area: 10,
        startDate: 'Wed Apr 02 2014 15:55:01 GMT-0400',
        initialStageLength: 1,
        developmentStageLength: 10,
        midStageLength: 4,
        lateStageLength: 4,
        kcInitial: 2,
        kcMid: 0,
        kcEnd: 1
      },
      {
        id: 2,
        userId: 2,
        cropName: 'CropName2',
        cropTypeId: 2,
        area: 0,
        startDate: 'Wed Apr 02 2014 15:55:01 GMT-0400',
        initialStageLength: 3,
        developmentStageLength: 7,
        midStageLength: 1,
        lateStageLength: 6,
        kcInitial: 2,
        kcMid: 0,
        kcEnd: 2
      },
      {
        id: 3,
        userId: 3,
        cropName: 'CropName3',
        cropTypeId: 3,
        area: 4,
        startDate: 'Wed Apr 02 2014 15:55:01 GMT-0400',
        initialStageLength: 0,
        developmentStageLength: 7,
        midStageLength: 2,
        lateStageLength: 5,
        kcInitial: 2,
        kcMid: 0,
        kcEnd: 0
      },
      {
        id: 4,
        userId: 4,
        cropName: 'CropName4',
        cropTypeId: 4,
        area: 0,
        startDate: 'Wed Apr 02 2014 15:55:01 GMT-0400',
        initialStageLength: 8,
        developmentStageLength: 10,
        midStageLength: 7,
        lateStageLength: 9,
        kcInitial: 0,
        kcMid: 0,
        kcEnd: 1
      }
    ];

    CropSessions = _CropSessions_;
    httpBackend = $httpBackend;

    httpBackend.whenGET(cropSessionEndpoint)
    .respond(cropSessions);


  }));

  describe('getAll', function() {
    it('should get the data from the right url', function() {
      httpBackend.expectGET(cropSessionEndpoint);
      CropSessions.getAll();
      httpBackend.flush();
    });
  });

  describe('create', function() {
    it('should get the data from the right url', function() {
      httpBackend.expectPOST(cropSessionEndpoint, cropSessions[0])
      .respond(cropSessions[0]);
      CropSessions.create(cropSessions[0]);
      httpBackend.flush();
    });
  });

  describe('get', function() {
    it('should get the cropSession with id 1', function() {
      httpBackend.expectGET(cropSessionEndpoint+'/1')
      .respond(cropSessions[0]);
      CropSessions.get(1);
      httpBackend.flush();
    });

    it('should get the cropSession with id 3', function() {
      httpBackend.expectGET(cropSessionEndpoint+'/3')
      .respond(cropSessions[2]);
      CropSessions.get(3);
      httpBackend.flush();
    });
  });

  describe('remove', function() {
    it('should get the cropSession with id 1', function() {
      httpBackend.expectDELETE(cropSessionEndpoint+'/1')
      .respond({});
      CropSessions.remove(1);
      httpBackend.flush();
    });

    it('should get the cropSession with id 3', function() {
      httpBackend.expectDELETE(cropSessionEndpoint+'/3')
      .respond({});
      CropSessions.remove(3);
      httpBackend.flush();
    });
  });

  describe('maintaining the state', function() {
    var fetchedData;
    beforeEach(function() {
      CropSessions.getAll().then(function(data) {
        fetchedData = data;
      });

      httpBackend.flush();
    });

    it('should remove a crop session with id 1 and update the data object', function() {
      httpBackend.expectDELETE(cropSessionEndpoint + '/1')
      .respond({});
      var expected = fetchedData.cropSessions.slice(1);
      CropSessions.remove(1).then(function() {
        expect(fetchedData.cropSessions).toEqual(expected);
      });

      httpBackend.flush();
    });

    it('should create a new crop session and update the data object', function() {
      var newCropSession = angular.copy(cropSessions[0]);
      newCropSession.cropName = 'New crop session';

      httpBackend.expectPOST(cropSessionEndpoint, newCropSession)
      .respond(newCropSession);

      var expectedLength = fetchedData.cropSessions.length + 1;
      CropSessions.create(newCropSession).then(function(createdCropSession) {
        var cropSessions = fetchedData.cropSessions;
        expect(cropSessions[cropSessions.length - 1]).toEqual(createdCropSession);
        expect(cropSessions.length).toBe(expectedLength);
      });
      httpBackend.flush();
    });

  });
});
