'use strict';

angular.module('pragmaApp')
.controller('DashboardCtrl', function ($scope, Auth, USER_ROLES, CropSessions, $state) {

  $scope.isFarmer = function() {
    return Auth.hasRole(USER_ROLES.farmer);
  };

  CropSessions.getAll().then(function(cropSessions) {
    $scope.cropSessions = cropSessions;
  });

  $scope.logout = function() {
    Auth.logout().then(function() {
      $state.go('landingPage');
    });
  };
});
