'use strict';

angular.module('pragmaApp')
.controller('FarmerOverviewCtrl', function ($scope, variables) {
  $scope.rainfallMap = {};
  variables.getMapsFor('rainfall').then(function(maps) {
    $scope.rainfallMap = maps[0];
  });
  $scope.map = {
    control: {},
    center:{
      latitude: 18.229351,
      longitude: -66.453767
    },
    zoom: 9,
    weatherLayer: {
      temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    }
  };

  $scope.location = 'Mayaguez, PR';
});
