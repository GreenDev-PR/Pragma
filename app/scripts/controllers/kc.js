'use strict';

angular.module('pragmaApp')
.controller('KcCtrl', function ($scope, cropSession, Restangular) {

  $scope.tempCropSession = Restangular.copy(cropSession);

  var generateSeries = function(cropSession, series) {
    series = series || [{name: 'Initial Stage'}, {name: 'Development Stage'}, {name: 'Mid Stage'}, {name: 'Late Stage'}];

    var initial = [0, cropSession.initialStageLength];
    var dev = [initial[1], initial[1] + cropSession.developmentStageLength];
    var mid = [dev[1], dev[1] + cropSession.midStageLength];
    var late = [mid[1], mid[1] + cropSession.lateStageLength];

    series[0].data = [
      [initial[0], cropSession.kcInitial],
      [initial[1], cropSession.kcInitial]
    ];

    series[1].data = [
      [dev[0], cropSession.kcInitial],
      [dev[1], cropSession.kcMid]
    ];

    series[2].data = [
      [mid[0], cropSession.kcMid],
      [mid[1], cropSession.kcMid]
    ];

    series[3].data = [
      [late[0], cropSession.kcMid],
      [late[1], cropSession.kcEnd]
    ];

    return series;
  };

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Crop Coefficient'
      },
      xAxis: {
        title: {
          text: 'Day in Crop Session'
        }
      },
      yAxis: {
        title: {
          text: 'Crop Coefficient (Kc)'
        }
      }
    },
    series: generateSeries($scope.tempCropSession)
  };

  $scope.updateChart = function() {
    generateSeries($scope.tempCropSession, $scope.chartConfig.series);
  };

  $scope.save = function() {
    $scope.tempCropSession.put().then(function(updatedCropSession) {
      $scope.tempCropSession = Restangular.copy(updatedCropSession);
      $scope.data.cropSession = updatedCropSession;
    });
  };

  $scope.cancel = function() {
    $scope.tempCropSession = Restangular.copy(cropSession);
    $scope.updateChart();
  };
});
