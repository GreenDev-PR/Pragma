'use strict';

angular.module('pragmaApp')
.controller('IrrigationhistoryCtrl', function ($scope, irrigationEvents) {
  $scope.irrigationEvents = irrigationEvents;
  // $scope.irrigationEvents = (function() {
  //   var arr = [];
  //   for (var i = 40 - 1; i >= 0; i--) {
  //     arr.push({irrigationDate: new Date(), irrigationVolume: i});
  //   }

  //   return arr;
  // })();

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line'
      }
    },
    series: [{
      data: [1,2,3,4,5]
    }],
    title: {
      text: 'Irrigated Volume'
    }
  };
});
