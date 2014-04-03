'use strict';

angular.module('pragmaApp').controller('UserProfileCtrl',['$scope', 'User', '$state', 'Geocoder', function($scope, User, $state, Geocoder){
  
  var me = {
    farmLatitude: 18.229351,
    farmLongitude: -66.453767,
    name: 'Miguel',
    lastName: 'Garcia',
    organization: 'University of Puerto Rico',
    email: 'test@test.com',
    password: 'password1'
  };
  // TODO: Change to use User service
  // User.getMe();

  console.log(me);

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
      latitude: me.farmLatitude,
      longitude: me.farmLongitude
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
  $scope.user.name = me.name;
  $scope.user.lastName = me.lastName;
  $scope.user.organization = me.organization;
  $scope.user.farmLatitude = me.farmLatitude;
  $scope.user.farmLongitude = me.farmLongitude;
  $scope.user.email = me.email;
  $scope.user.password = me.password;

  $scope.address = 'Bayamon, PR';

  console.log($scope.user);

  $scope.saveChanges = function(form) {
    console.log(form);
    if(form.$valid && $scope.selectedItsLocation) {
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
