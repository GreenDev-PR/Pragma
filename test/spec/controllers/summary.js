'use strict';

describe('Controller: SummaryCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var SummaryCtrl;
  var scope;
  var cropSession;
  var cropTypes;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {

    cropSession = {
      startDate:'Thu Apr 03 2014 15:48:16 GMT-0400',
      id: 1,
      area: 9,
      userId: 1,
      cropName: 'CropName1',
      cropTypeId: 2,
      initialStageLength: 4,
      developmentStageLength: 0,
      midStageLength: 0,
      lateStageLength: 1,
      kcInitial: 2,
      kcMid: 2,
      kcEnd: 1,
      createdAt: '2014-04-03T19:48:17.554Z',
      updatedAt: '2014-04-03T19:48:17.554Z'
    };

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
    scope = $rootScope.$new();
    scope.data = {};
    SummaryCtrl = $controller('SummaryCtrl', {
      $scope: scope,
      cropSession: cropSession,
      cropTypes: cropTypes
    });
  }));

  it('should be able to get the cropType name', function () {
    expect(scope.getCropTypeName()).toEqual(cropTypes[1].cropType);
  });
});
