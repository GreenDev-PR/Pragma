'use strict';

angular.module('pragmaApp').controller('ProjectPagesCtrl',function($scope) {
  $scope.links = [
    {name: 'Landing Page', sref: 'landingPage'},
    {name: 'Sign Up Researcher', sref: 'signup-researcher'},
    {name: 'Sign Up Farmer', sref: 'signup-farmer'},
    {name: 'Dashboard', sref: 'dashboard.overview'}
  ];
});
