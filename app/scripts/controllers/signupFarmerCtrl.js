'use strict';

angular.module('pragmaApp').controller('SignupFarmerCtrl',['$scope', 'User', '$state', 'Geocoder', function($scope, User, $state, Geocoder){
  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(17.80072, -67.3),
    new google.maps.LatLng(18.7, -65.4205)
    );

  $scope.selectedItsLocation = false;
  var setFarmerLocation = function(location) {
    $scope.user.farmLatitude = location.lat();
    $scope.user.farmLongitude = location.lng();
  };

  var checkMarkerLocation = function(marker) {
    if(!bounds.contains(marker.getPosition())) {
      marker.setPosition(bounds.getCenter());
      return false;
    }

    return true;
  };

	$scope.map = {
		center:{
			latitude: 18.229351,
			longitude: -66.453767
		},
    control: {},
    zoom: 8,
    events: {
      'dragend': function(map) {
        if(!bounds.contains(map.getCenter())) {
          map.fitBounds(bounds);
        }
      }
    }
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
      'dragend': function(marker) {
        if(!checkMarkerLocation(marker)) {
          return;
        }
        $scope.selectedItsLocation = true;
        setFarmerLocation(marker.getPosition());
      }
    }
  };

  $scope.user = {userType: 'farmer'};
  $scope.address = 'Bayamon, PR';
  $scope.confirmedPassword = null;
  $scope.register = function(form) {
    if(form.$valid && $scope.selectedItsLocation) {
      if($scope.user.password !== $scope.confirmedPassword) {
        // TODO: improve error messaging.
        alert('Passwords need to be equal');
        return;
      }

      User.register($scope.user).then(function() {
        $state.go('login');
      })
      .catch(function(response) {
        console.log(response);
      });
    }
  };

  $scope.searchAddress = function() {
    Geocoder.geocode({ 'address': $scope.address}).then(function(results) {

      var location = results[0].geometry.location;
      if(!bounds.contains(location)) {
        return;
      }
      $scope.selectedItsLocation = true;
      $scope.map.control.getGMap().setCenter(location);
      $scope.map.zoom = 13;
      $scope.marker.coords.latitude = location.lat();
      $scope.marker.coords.longitude = location.lng();

      setFarmerLocation(location);
    });
  };
}]);
