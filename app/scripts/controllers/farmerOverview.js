'use strict';

angular.module('pragmaApp')
.controller('FarmerOverviewCtrl', function ($scope, variables, geolocation, $timeout) {
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


  this.getUserLocation = function() {
    geolocation.getLocation().then(function(data) {
      var coords = data.coords;
      $scope.location = coords.latitude + ',' + coords.longitude;
    }, function() {
      $scope.location = 'Mayaguez, PR';
    });
  };


  $timeout(this.getUserLocation, 10);

});
