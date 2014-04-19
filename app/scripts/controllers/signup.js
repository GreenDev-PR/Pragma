'use strict';

angular.module('pragmaApp')
.controller('SignupCtrl', function ($scope, Auth, $state, User) {
  $scope.user = {userType: 'researcher'};
  $scope.errors = {};

  $scope.register = function(form) {

    if(form.$valid) {
      User.register($scope.user).then(function() {
        $state.go('login');
        $scope.user = {userType: 'researcher'};
        $scope.errors = {};
      })
      .catch(function(response) {
        $scope.errors = response.data;
      });
    }
  };
});
