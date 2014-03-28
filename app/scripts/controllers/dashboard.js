'use strict';

angular.module('pragmaApp')
.controller('DashboardCtrl', function ($scope, Auth, USER_ROLES) {

  $scope.isFarmer = function() {
    return Auth.hasRole(USER_ROLES.farmer);
  };

});
