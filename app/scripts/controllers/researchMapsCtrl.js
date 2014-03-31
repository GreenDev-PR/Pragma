'use strict';

angular.module('pragmaApp')
  .controller('ResearchMapsCtrl', ['$scope', '$filter','variables', function ($scope, $filter, variables) {

  var DEFAULT_INTERVAL = 3000;

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
  $scope.maxDate = '2014-04-27';
  //var MIN_INTERVAL = 1;
  //var MAX_INTERVAL = 10;

  $scope.format = 'yyyy-MM-dd';
  
  //$scope.slides = goesService.getSlides();
  //$scope.variables = goesService.getVariables();

  variables.getAll().then(function(result){
    $scope.variables = result;
    $scope.variable =  $scope.variables[0].variableName;
  });
  
  // $scope.startDate = $scope.startDate;
  // $scope.endDate = $scope.endDate;

  $scope.state = {
    interval: DEFAULT_INTERVAL
  };


 /* $scope.updateInterval = function () {
    if (MIN_INTERVAL <= $scope.newInterval && $scope.newInterval <= MAX_INTERVAL) {
      $scope.state.interval = $scope.newInterval * 1000;
    } else {
      $scope.state.interval = DEFAULT_INTERVAL;
    }
  };*/

  $scope.generateSlideshow = function () {
    
    var startDateWithoutTimeZone = $filter('date')($scope.startDate.value,$scope.format);
    var endDateWithoutTimeZone = $filter('date')($scope.endDate.value,$scope.format);

    variables.getMapsFor($scope.variable.variableName, startDateWithoutTimeZone, endDateWithoutTimeZone)
    .then(function (result){
      $scope.slides = result;
      console.log($scope.slides);
    });
  };

}]);
