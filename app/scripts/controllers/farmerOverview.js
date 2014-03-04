'use strict';

angular.module('pragmaApp')
.controller('FarmerOverviewCtrl', function ($scope) {
  $scope.map = {
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
