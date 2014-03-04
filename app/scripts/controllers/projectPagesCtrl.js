'use strict';

angular.module('pragmaApp').controller('ProjectPagesCtrl',function($scope) {
  $scope.links = [
    {name: 'Landing Page', href: 'landingPage'},
    {name: 'Sign Up Researcher', href: 'signup-researcher'},
    {name: 'Sign Up Farmer', href: 'signup-farmer'},
    {name: 'Farmer Overview', href: 'farmer-overview'}
  ];
});