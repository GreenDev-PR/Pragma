'use strict';

angular.module('pragmaApp').controller('signupFarmerCtrl',['$scope', 'Geocoder', function($scope, Geocoder){

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
    }
  };

  $scope.user = {};
  $scope.address = 'Bayamon, PR';

  $scope.searchAddress = function() {
    Geocoder.geocode( { 'address': $scope.address}).then(function(results) {
      var location = results[0].geometry.location;
      $scope.map.control.getGMap().setCenter(location);
      $scope.map.zoom = 13;
      $scope.marker.coords.latitude = location.lat();
      $scope.marker.coords.longitude = location.lng();
    });
  };
}]);
