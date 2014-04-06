'use strict';

angular.module('pragmaApp')
.controller('IrrigationrequirementCtrl', function ($scope, cropSession) {
  $scope.cropSession = cropSession;

  $scope.format = 'yyyy/MM/dd';
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

  $scope.dateOptions = {
    'date-format': '\'dd-MMMM-yyyy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  };

  $scope.calculate = function(form) {
    if(form.$valid) {
      // TODO: make calculation
    }
  };
});
