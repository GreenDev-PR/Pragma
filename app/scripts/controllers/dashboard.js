'use strict';

angular.module('pragmaApp')
.controller('DashboardCtrl', function ($scope, Auth, USER_ROLES, CropSessions, $state) {

  $scope.isFarmer = function() {
    return Auth.hasRole(USER_ROLES.farmer);
  };

  if($scope.isFarmer()) {
    CropSessions.getAll().then(function(data) {
      $scope.data = data;
    });
  }

  $scope.logout = function() {
    Auth.logout().then(function() {
      $state.go('landingPage');
    });
  };
});
