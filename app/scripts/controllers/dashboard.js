'use strict';

angular.module('pragmaApp')
.controller('DashboardCtrl', function ($scope, Auth, USER_ROLES, CropSessions, $state) {

  $scope.isFarmer = function() {
    return Auth.hasRole(USER_ROLES.farmer);
  };

  CropSessions.getAll().then(function(cropSessions) {
    $scope.cropSessions = cropSessions;
  });

  $scope.$on('delete:cropSession', function(evt, index) {
    $scope.cropSessions.splice(index, 1);
  });

  $scope.$on('add:cropSession', function(evt, cropSession) {
    $scope.cropSessions.push(cropSession);
  });

  $scope.logout = function() {
    Auth.logout().then(function() {
      $state.go('landingPage');
    });
  };
});
