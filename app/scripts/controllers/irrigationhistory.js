'use strict';

angular.module('pragmaApp')
.controller('IrrigationhistoryCtrl', function ($scope, irrigationEvents) {
  $scope.data.irrigationEvents = irrigationEvents;

  var getDataFromIrrigationEvents = function() {
    return $scope.data.irrigationEvents.map(function(irrigationEvent) {
      return [new Date(irrigationEvent.irrigationDate), irrigationEvent.irrigationVolume];
    });
  };

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line'
      },
      legend: {
        enabled: false
      },
      title: {
        text: 'Irrigated Volume'
      }
    },
    series: [{
      data: getDataFromIrrigationEvents()
    }],
    xAxis: {
      type: 'datetime'
    }
  };
});
