'use strict';

angular.module('pragmaApp')
.controller('IrrigationhistoryCtrl', function ($scope, irrigationEventsData, $filter) {
  $scope.data = irrigationEventsData;
  var getDataFromIrrigationEvents = function() {
    var data = $filter('orderBy')($scope.data.irrigationEvents, 'irrigationDate');
    return data.map(function(irrigationEvent) {
      return [Date.parse(irrigationEvent.irrigationDate), irrigationEvent.irrigationVolume];
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
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Irrigated Volume(gallons)'
        }
      }
    },
    series: [{
      data: getDataFromIrrigationEvents()
    }]
  };

  $scope.$watch('data.irrigationEvents.length', function(newVal, oldVal) {
    if(newVal !== oldVal) {
      $scope.chartConfig.series[0].data = getDataFromIrrigationEvents();
    }
  });
});
