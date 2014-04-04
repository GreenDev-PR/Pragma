'use strict';

angular.module('pragmaApp')
.controller('KcCtrl', function ($scope) {
  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line',
        zoomType: 'x'
      }
    },
    series: [{
      data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
    }],
    title: {
      text: 'Crop Coefficient'
    },
    xAxis: {currentMin: 0, currentMax: 10, minRange: 1},
    loading: false
  };
});
