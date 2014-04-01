'use strict';

angular.module('pragmaApp').controller('SignupFarmerCtrl',['$scope', 'User', '$state', 'Geocoder', function($scope, User, $state, Geocoder){
  $scope.selectedItsLocation = false;
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
        $scope.selectedItsLocation = true;
        setFarmerLocation(marker.getPosition());
      }
    }
  };

  $scope.user = {userType: 'farmer'};
  $scope.address = 'Bayamon, PR';

  $scope.register = function(form) {
    console.log(form);
    if(form.$valid && $scope.selectedItsLocation) {
      console.log(User);
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
      $scope.selectedItsLocation = true;

      var location = results[0].geometry.location;
      $scope.map.control.getGMap().setCenter(location);
      $scope.map.zoom = 13;
      $scope.marker.coords.latitude = location.lat();
      $scope.marker.coords.longitude = location.lng();

      setFarmerLocation(location);
    });
  };
}]);
