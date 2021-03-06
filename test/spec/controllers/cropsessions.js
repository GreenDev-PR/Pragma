'use strict';

describe('Controller: CropSessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var CropSessionsCtrl, cropSessionsService, cropTypesService, scope, q;
  var crops;
  var cropTypes;

  beforeEach(inject(function ($controller, $injector, _$q_) {

    crops = [
      {
        startDate:'Thu Apr 03 2014 15:48:16 GMT-0400',
        id: 1,
        area: 9,
        userId: 1,
        cropName: 'CropName1',
        cropTypeId: 1,
        initialStageLength: 4,
        developmentStageLength: 0,
        midStageLength: 0,
        lateStageLength: 1,
        kcInitial: 2,
        kcMid: 2,
        kcEnd: 1,
        createdAt: '2014-04-03T19:48:17.554Z',
        updatedAt: '2014-04-03T19:48:17.554Z'
      }
    ];

    cropTypes = [
      {
        id: 1,
        cropType: 'Avocado',
        createdAt: '2014-04-03T23:21:12.089Z',
        updatedAt: '2014-04-03T23:21:12.089Z'
      },
      {
        id: 2,
        cropType: 'Broccoli',
        createdAt: '2014-04-03T23:21:12.089Z',
        updatedAt: '2014-04-03T23:21:12.089Z'
      }
    ];

    q = _$q_;

    cropSessionsService = $injector.get('CropSessions');

    spyOn(cropSessionsService,'remove').and.callFake(function(){
      return q.when({});
    });

    cropTypesService = $injector.get('CropTypes');

    scope = $injector.get('$rootScope').$new();
    CropSessionsCtrl = $controller('CropSessionsCtrl', {
      $scope: scope,
      cropSessionsData: {cropSessions: crops},
      cropTypes: cropTypes
    });

    scope.$digest();
  }));

  describe('initial state', function() {

    it('should have a cropSessions property equal to the one injected', function(){
      expect(scope.data.cropSessions).toEqual(crops);
    });

    it('should have a cropTypes property equal to the one injected', function(){
      expect(scope.cropTypes).toEqual(cropTypes);
    });
  });

  describe('deleteCropSession',function(){

    var cropList;

    beforeEach (function(){
      cropList = [
          {
            startDate:'Tue Apr 01 2014 15:48:16 GMT-0400',
            id: 1,
            area: 9,
            userId: 1,
            cropName: 'CropName1',
            cropTypeId: 1,
            initialStageLength: 4,
            developmentStageLength: 0,
            midStageLength: 0,
            lateStageLength: 1,
            kcInitial: 2,
            kcMid: 2,
            kcEnd: 1,
            createdAt: '2014-04-03T19:48:17.554Z',
            updatedAt: '2014-04-03T19:48:17.554Z'
          },
          {
            startDate:'Wed Apr 02 2014 15:48:16 GMT-0400',
            id: 1,
            area: 9,
            userId: 1,
            cropName: 'CropName2',
            cropTypeId: 1,
            initialStageLength: 4,
            developmentStageLength: 0,
            midStageLength: 0,
            lateStageLength: 1,
            kcInitial: 2,
            kcMid: 2,
            kcEnd: 1,
            createdAt: '2014-04-03T19:48:17.554Z',
            updatedAt: '2014-04-03T19:48:17.554Z'
          }
        ];
    });

    it('should have 3 elements before calling $scope.deleteCropSession', function(){
      scope.data.cropSessions = cropList;
      expect(scope.data.cropSessions.length).toBe(2);
    });

    it('should remove the first element from list', function(){
      scope.data.cropSessions = cropList;
      scope.deleteCropSession(0);
      scope.$digest();
      expect(scope.data.cropSessions).not.toEqual(crops);
    });

    it('should remove the second element from list', function(){
      scope.data.cropSessions = cropList;
      scope.deleteCropSession(0);
      scope.$digest();
      expect(scope.data.cropSessions).not.toEqual(crops);
    });

  });

});
