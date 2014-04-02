'use strict';

angular.module('pragmaApp')
.controller('ResearchMapsCtrl', ['$scope', '$filter','variables', function ($scope, $filter, variables) {

  var DEFAULT_INTERVAL = 3000;
  var dateFilter = $filter('date');

  $scope.startDate = {
    value: new Date(),
    opened: false,
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startDate.opened = true;
    }
  };

  $scope.endDate = {
    value: new Date(),
    opened: false,
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endDate.opened = true;
    }
  };

  $scope.showWeeks = false;

  $scope.dateOptions = {
    'date-format': '\'dd-MMMM-yyyy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  };

  $scope.minDate = '2009-01-01';

  $scope.format = 'yyyy-MM-dd';

  variables.getAll().then(function(result){
    $scope.variables = result;
  });

  $scope.state = {
    interval: DEFAULT_INTERVAL
  };

  $scope.generateSlideShow = function () {

    var startDateWithoutTimeZone = dateFilter($scope.startDate.value,$scope.format);
    var endDateWithoutTimeZone = dateFilter($scope.endDate.value,$scope.format);

    if(new Date(endDateWithoutTimeZone) >= new Date(startDateWithoutTimeZone)){
      variables.getMapsFor($scope.variable.variableName, startDateWithoutTimeZone, endDateWithoutTimeZone)
      .then(function (result){
        $scope.slides = result;
      });
    }
  };

}]);
