'use strict';

describe('Controller: KcCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var cropSession;
  var KcCtrl;
  var scope;
  var Restangular;
  var q;

  beforeEach(inject(function ($controller, $rootScope, _Restangular_, $q) {
    cropSession = {
      'startDate': 'Fri Apr 04 2014 15:09:22 GMT-0400',
      'id': 1,
      'area': 9,
      'userId': 1,
      'cropName': 'CropName1',
      'cropTypeId': 1,
      'initialStageLength': 2,
      'developmentStageLength': 7,
      'midStageLength': 8,
      'lateStageLength': 3,
      'kcInitial': 0,
      'kcMid': 0,
      'kcEnd': 1,
      'createdAt': '2014-04-04T19:09:23.121Z',
      'updatedAt': '2014-04-04T19:09:23.121Z'
    };

    q = $q;
    Restangular = _Restangular_;
    cropSession = Restangular.restangularizeElement(null, cropSession, '');

    scope = $rootScope.$new();
    scope.data = {};
    KcCtrl = $controller('KcCtrl', {
      $scope: scope,
      cropSession: cropSession,
      Restangular: Restangular
    });

    jasmine.addMatchers({
      toEqualRestangularElement: function(util) {
        return {
          compare: function(actual, expected) {
            actual = Restangular.stripRestangular(actual);
            expected = Restangular.stripRestangular(expected);
            return {
              pass: util.equals(actual, expected)
            };
          }
        };
      }
    });

  }));

  describe('chart', function() {
    it('should have a chartConfig defined', function() {
      expect(scope.chartConfig).toBeDefined();
    });

    describe('updateChart', function() {
      describe('after updating the initialStageLength and kcMid', function() {
        beforeEach(function() {
          scope.tempCropSession.initialStageLength = 5000;
          scope.tempCropSession.kcMid = 3000;
        });

        it('should have the timeseries data updated', function() {
          scope.updateChart();
          expect(scope.chartConfig.series[0].data[1][0]).toBe(5000);
          expect(scope.chartConfig.series[2].data[1][1]).toBe(3000);
        });

        it('should have only updated the tempCropSession', function() {
          expect(scope.tempCropSession).not.toEqualRestangularElement(cropSession);
        });
      });
    });
  });

  describe('cropSession', function() {
    it('should have a copy of the cropSession', function() {
      expect(scope.tempCropSession).not.toBe(cropSession);
    });

    it('should have the same values as the cropSession', function() {
      expect(scope.tempCropSession).toEqualRestangularElement(cropSession);
    });

    describe('after updating the tempCropSession', function() {
      beforeEach(function(){
        scope.tempCropSession.initialStageLength = 5000;
      });

      it('should not equal the actual cropSession', function() {
        expect(scope.tempCropSession).not.toEqualRestangularElement(cropSession);
      });
    });
  });

  describe('save', function() {
    beforeEach(function() {
      spyOn(scope.tempCropSession, 'put').and.callFake(function() {
        return q.when(Restangular.copy(scope.tempCropSession));
      });
    });

    it('should call the tempCropSession put method', function() {
      scope.tempCropSession.initialStageLength = 5000;
      scope.save();
      expect(scope.tempCropSession.put).toHaveBeenCalledWith();
      scope.$apply();
      expect(scope.tempCropSession).toEqualRestangularElement(scope.tempCropSession);
    });
  });

  describe('cancel', function() {
    describe('after modifying the cropSession', function() {
      beforeEach(function() {
        scope.tempCropSession.initialStageLength = 400;
      });

      it('should revert the changes', function() {
        expect(scope.tempCropSession).not.toEqualRestangularElement(cropSession);
        scope.cancel();
        expect(scope.tempCropSession).toEqualRestangularElement(cropSession);
      });
    });
  });
});
