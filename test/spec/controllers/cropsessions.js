'use strict';

describe('Controller: CropSessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var CropSessionsCtrl, cropSessionsService, cropTypesService, scope, q;
  var crops = [
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
  var cropTypeResult = [
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

  beforeEach(inject(function ($controller, $injector, _$q_) {
    scope = $injector.get('$rootScope').$new();

    q = _$q_;

    cropSessionsService = $injector.get('CropSessions');
    cropTypesService = $injector.get('CropTypes');

    spyOn(cropSessionsService,'getAll').and.callFake(function(){
      return q.when(crops);
    });

    // spyOn(cropSessionsService,'').and.callFake(function(){
    //   return q.when();
    // });

    spyOn(cropTypesService,'getAll').and.callFake(function(){
      return q.when(cropTypeResult);
    });

    CropSessionsCtrl = $controller('CropSessionsCtrl', {
      $scope: scope
    });

    scope.$digest();
  }));

  describe('getCropSessions', function(){

    var expectedCropSessions = [
      {
        startDate: new Date('Thu Apr 03 2014 15:48:16 GMT-0400'),
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

    it('should have been called', function() {
      expect(cropSessionsService.getAll).toHaveBeenCalled();
    });

    it('should expect scope.cropList', function(){
      expect(scope.cropList).toBeDefined();
    });

    it('should return an array of cropSessions', function(){
      expect(scope.cropList).toEqual(expectedCropSessions);
    });

  });

  describe('getCropType', function(){
    console.log('printing scope: '+scope);
    var expectedCropTypes = [
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

    it('should have been called', function(){
      expect(cropTypesService.getAll).toHaveBeenCalled();
    });

    it('should expect scope.cropTypesList', function(){
      expect(scope.cropTypeList).toBeDefined();
    });

    it('should return an array of cropTypes', function(){
      expect(scope.cropTypeList).toEqual(expectedCropTypes);
    });

  });

  describe('deleteCropSession',function(){

    var cropList = [
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
        },
        {
          startDate:'Thu Apr 03 2014 15:48:16 GMT-0400',
          id: 1,
          area: 9,
          userId: 1,
          cropName: 'CropName3',
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

    beforeEach (function(){
    
    });

    it('should have 3 elements before calling $scope.deleteCropSession', function(){
      scope.cropList = cropList;
      expect(scope.cropList.length).toBe(3);
       
    });

    // it('should have been called', function(){
    //   scope.deleteCropSession(0);
    //   expect(cropSessionsService.delete(2)).toHaveBeenCalled();
    // });

    // it('should remove crop #2 from the cropList', function(){
    //   scope.deleteCropSession(1);
    //   expect(scope.cropList.length).toBe(2);
    // });

    // it('should remove crop #3 from the cropList', function(){
    //   scope.deleteCropSession(2);
    //   expect(cropList.length).toBe(2);
    // });

    // it('after call should not have a different length to 3', function(){
    //   scope.deleteCropSession(2);
    //   expect(cropList.length).not.toBe(3);
    // });

  });

});
