'use strict';

angular.module('pragmaApp')
.controller('IrrigationhistoryCtrl', function ($scope, irrigationEventsData) {
  $scope.data = irrigationEventsData;
  console.log('the irrigation events', irrigationEventsData);
  var getDataFromIrrigationEvents = function() {
    return $scope.data.irrigationEvents.map(function(irrigationEvent) {
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
      }
    },
    series: [{
      data: getDataFromIrrigationEvents()
    }],
    xAxis: {
      type: 'datetime'
    }
  };

  $scope.$watch('data.irrigationEvents', function() {
    console.log('the data changed');
    $scope.chartConfig.series = [{data: getDataFromIrrigationEvents()}];
  });
});
