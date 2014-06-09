'use strict';

angular.module('pragmaApp')
.controller('SignupCtrl', function ($scope, Auth, $state, User) {
  $scope.user = {userType: 'researcher'};
  $scope.confirmedPassword = null;
  $scope.errors = {};

  $scope.register = function(form) {

    if(form.$valid) {
      if($scope.user.password !== $scope.confirmedPassword) {
        // TODO: improve error messaging.
        alert('Passwords need to be equal');
        return;
      }
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
