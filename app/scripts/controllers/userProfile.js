'use strict';

/**
 * Update profile controller module.
 * Controls the functionality to display, validate and update the user profile data. 
 * Uses the 'User' service to request the current user and update profile
 */
angular.module('pragmaApp').controller('UserProfileCtrl',['$scope', '$state', 'Geocoder', 'user', 'Restangular', function($scope, $state, Geocoder, user, Restangular) {

  /**
   * Defining the map object and configuring initial properties
   * @type {Object}
   */
  $scope.map = {
    center:{
      latitude: 18.229351,
      longitude: -66.453767
    },
    control: {},
    zoom: 9
  };

  /**
   * Defining the map marker object and configuring initial properties
   * @type {Object}
   */
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
      /**
       * Event triggered by the marker when it is dragged
       * @param  {Object} marker marker that was dragged with new coordinates
       */
      dragend: function(marker) {
        setFarmerLocation(marker.getPosition());
      }
    }
  };

  /**
   * Defining the address object and assigning the initial location
   * @type {String}
   */
  $scope.address = 'Mayaguez, PR';

  /**
   * Function triggered by the Get Address button. Updates the currently selected location to
   * the address returned by the search. 
   */
  $scope.searchAddress = function() {
    Geocoder.geocode({'address': $scope.address}).then(function(results) {

      var location = results[0].geometry.location;
      $scope.map.control.getGMap().setCenter(location);
      $scope.map.zoom = 13;

      /**
       * Binding the marker's latitude to the new location returned by the search.
       * @type {Object}
       */
      $scope.marker.coords.latitude = location.lat();

      /**
       * Binding the marker's longitude to the new location returned by the search.
       * @type {Object}
       */
      $scope.marker.coords.longitude = location.lng();

      setFarmerLocation(location);
    });
  };

  /**
   * Creates the tempUser where the user's profile is stored, prior to changes
   * @type {Object}
   */
  $scope.tempUser = Restangular.copy(user);

  /**
   * Configuring the initial latitude of the marker to the temp user's coordinates
   * @type {Object}
   */
  $scope.marker.coords.latitude = $scope.tempUser.farmLatitude;

  /**
   * Configuring the initial longitude of the marker to the temp user's coordinates
   * @type {Object}
   */
  $scope.marker.coords.longitude = $scope.tempUser.farmLongitude;
  
  /**
   * Helper method to update the location of the temp user.
   * @param {Object} location location object with new latitude and longitude
   */
  var setFarmerLocation = function(location) {
    $scope.tempUser.farmLatitude = location.lat();
    $scope.tempUser.farmLongitude = location.lng();
  };

  /**
   * Action triggered by pressing the Save button. Uses the User.update method to update the profile.
   */
  $scope.saveChanges = function(form) {
    console.log(form);
    //Allows updating the profile only if the form is valid. 
    if(form.$valid) {
      $scope.tempUser.put().then(function(modifiedUser) {
        $scope.tempUser = Restangular.copy(modifiedUser);
      });
    }
  };
}]);
