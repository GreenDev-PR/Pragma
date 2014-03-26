'use strict';

angular.module('pragmaApp')
  .controller('LoginCtrl', function ($scope, Auth, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      if(form.$valid) {
        $scope.errors = {};
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          $state.go('dashboard.overview');
        })
        .catch( function(error) {
          $scope.errors.explanation = error.data.explanation;
        });
      }
    };
  });
