'use strict';

angular.module('pragmaApp')
.controller('KcCtrl', function ($scope, cropSession) {

  var generateSeries = function(cropSession) {
    var initial = [0, cropSession.initialStageLength];
    var dev = [initial[1], initial[1] + cropSession.developmentStageLength];
    var mid = [dev[1], dev[1] + cropSession.midStageLength];
    var late = [mid[1], mid[1] + cropSession.lateStageLength];
    return [
      {
        name: 'Initial Stage',
        data: [
          [initial[0], cropSession.kcInitial],
          [initial[1], cropSession.kcInitial]
        ]
      },
      {
        name: 'Development Stage',
        data: [
          [dev[0], cropSession.kcInitial],
          [dev[1], cropSession.kcMid]
        ]
      },
      {
        name: 'Mid Stage',
        data: [
          [mid[0], cropSession.kcMid],
          [mid[1], cropSession.kcMid]
        ]
      },
      {
        name: 'Late Stage',
        data: [
          [late[0], cropSession.kcMid],
          [late[1], cropSession.kcEnd]
        ]
      },
    ];
  };

  $scope.cropSession = cropSession;

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line'
      }
    },
    series: generateSeries(cropSession),
    title: {
      text: 'Crop Coefficient'
    },
    loading: false
  };

  // $scope.update = function() {
  //   $scope.chartConfig.series[0];
  // };

  $scope.save = function() {
    $scope.chartConfig.series = generateSeries($scope.cropSession);
  };

});
