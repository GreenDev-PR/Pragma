'use strict';

angular.module('pragmaApp')
.controller('IrrigationrequirementCtrl', function ($scope, cropSession, CropSessions, DATE_PICKER) {
  $scope.cropSession = cropSession;
  $scope.irrigationVolume = 0;
  $scope.lastIrrigation = {
    // value: new Date(),
    opened: false,
    open: function($event) {
      console.log('dfadlshfdklsfhdsfksdhflk');
      $event.preventDefault();
      $event.stopPropagation();

      $scope.lastIrrigation.opened = true;
    }
  };

  $scope.datePicker = DATE_PICKER;

  $scope.calculate = function(form) {
    if(form.$valid) {
      cropSession.customGET('calculateIrrigation', {lastIrrigationDate: $scope.lastIrrigation.value.toString()})
      .then(function(response) {
        $scope.irrigationVolume = response.result;
      });
    }
  };

  $scope.save = function() {
    var irrigationEvent = {
      cropSessionId: cropSession.id,
      irrigationDate: $scope.lastIrrigation.value,
      irrigationVolume: $scope.irrigationVolume
    };

    CropSessions.createIrrigationEvent(cropSession.id, irrigationEvent).then(function() {
      console.log('saved');
    });
  };
});
