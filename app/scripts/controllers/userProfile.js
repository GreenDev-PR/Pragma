'use strict';

angular.module('pragmaApp').controller('UserProfileCtrl',['$scope', 'User', '$state', 'Geocoder', function($scope, User, $state, Geocoder){
  
  User.getMe().then(function(me){
    console.log('me', me);

    $scope.user = me;
    $scope.marker.coords.latitude = me.farmLatitude;
    $scope.marker.coords.longitude = me.farmLongitude;

  });

  var setFarmerLocation = function(location) {
    $scope.user.farmLatitude = location.lat();
    $scope.user.farmLongitude = location.lng();
  };

  $scope.map = {
    center:{
      latitude: 18.229351,
      longitude: -66.453767
    },
    control: {},
    zoom: 8
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

  $scope.saveChanges = function(form) {
    console.log(form);
    if(form.$valid) {
      User.update($scope.user).then(function() {
        $state.go('dashboard.overview');
      })
      .catch(function(response) {
        console.log(response);
      });
    }
  };

  $scope.searchAddress = function() {
    Geocoder.geocode({ 'address': $scope.address}).then(function(results) {

      var location = results[0].geometry.location;
      $scope.map.control.getGMap().setCenter(location);
      $scope.map.zoom = 13;
      $scope.marker.coords.latitude = location.lat();
      $scope.marker.coords.longitude = location.lng();

      setFarmerLocation(location);
    });
  };
}]);
