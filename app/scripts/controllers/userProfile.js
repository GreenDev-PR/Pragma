'use strict';

angular.module('pragmaApp').controller('UserProfileCtrl',['$scope', '$state', 'Geocoder', 'user', 'Restangular', function($scope, $state, Geocoder, user, Restangular) {

  $scope.map = {
    center:{
      latitude: 18.229351,
      longitude: -66.453767
    },
    control: {},
    zoom: 9
  };

  $scope.marker = {
    coords: {
      latitude: 18.229351,
      longitude: -66.453767
    },
    options: {
      draggable: true,
      visible: true
    },
    events: {
      dragend: function(marker) {
        setFarmerLocation(marker.getPosition());
      }
    }
  };

  $scope.address = 'Bayamon, PR';

  $scope.searchAddress = function() {
    Geocoder.geocode({'address': $scope.address}).then(function(results) {

      var location = results[0].geometry.location;
      $scope.map.control.getGMap().setCenter(location);
      $scope.map.zoom = 13;
      $scope.marker.coords.latitude = location.lat();
      $scope.marker.coords.longitude = location.lng();

      setFarmerLocation(location);
    });
  };

  $scope.tempUser = Restangular.copy(user);
  $scope.marker.coords.latitude = $scope.tempUser.farmLatitude;
  $scope.marker.coords.longitude = $scope.tempUser.farmLongitude;
  var setFarmerLocation = function(location) {
    $scope.tempUser.farmLatitude = location.lat();
    $scope.tempUser.farmLongitude = location.lng();
  };


  $scope.saveChanges = function(form) {
    console.log(form);
    if(form.$valid) {
      $scope.tempUser.put().then(function(modifiedUser) {
        $scope.tempUser = Restangular.copy(modifiedUser);
        delete $scope.tempUser.password;
      });
    }
  };
}]);
