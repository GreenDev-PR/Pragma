'use strict';

angular.module('pragmaApp').controller('ApplicationCtrl', function ($scope, $state, USER_ROLES, Auth, AUTH_EVENTS) {

  // variables for use in child scopes.
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = Auth.isAuthorized;

  $scope.$on(AUTH_EVENTS.loginSuccess, function(event, user) {
    $scope.currentUser = user;
  });

  $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.currentUser = null;
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
    if(!$state.is('login')) {
      $state.go('login');
    }
  });
});
