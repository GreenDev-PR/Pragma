'use strict';

angular.module('pragmaApp')
  .controller('ResearchMapsCtrl', ['$scope', 'variables', function ($scope, variables) {

  var DEFAULT_INTERVAL = 3000;

  //var MIN_INTERVAL = 1;
  //var MAX_INTERVAL = 10;

  //$scope.slides = goesService.getSlides();
  //$scope.variables = goesService.getVariables();

  variables.getAll().then(function(result){
    $scope.variables = result;
    $scope.variable =  $scope.variables[0].variableName;
  });
  
  $scope.startDate = $scope.startDate;
  $scope.endDate = $scope.endDate;

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
    
    console.log($scope.startDate);
    console.log($scope.endDate);

    variables.getMapsFor($scope.variable.variableName, $scope.startDate, $scope.endDate).then(function (result){
      $scope.slides = result;
      console.log($scope.slides);
    });
  };

}]);
