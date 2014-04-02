'use strict';

angular.module('pragmaApp').controller('ProjectPagesCtrl',function($scope) {
  $scope.links = [
    {name: 'Landing Page', sref: 'landingPage'},
    {name: 'Sign Up Researcher', sref: 'signup-researcher'},
    {name: 'Sign Up Farmer', sref: 'signup-farmer'},
    {name: 'Dashboard', sref: 'dashboard.overview'},
    {name: 'CropSessions', sref: 'dashboard.cropSessions'},
    {name: 'ResearchMaps', sref: 'dashboard.research-maps' },
    {name: 'ResearchVariables', sref: 'dashboard.research-variables'},
    {name: 'Dashboard', sref: 'dashboard.overview'},
    {name: 'Plots Researcher', sref: 'dashboard.plots-researcher'}
  ];
});
