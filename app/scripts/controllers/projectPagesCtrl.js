'use strict';

angular.module('pragmaApp').controller('ProjectPagesCtrl',function($scope) {
  $scope.links = [
    {name: 'Login', sref: 'login'},
    {name: 'Landing Page', sref: 'landingPage'},
    {name: 'Sign Up Researcher', sref: 'signup-researcher'},
    {name: 'Sign Up Farmer', sref: 'signup-farmer'},
    {name: 'Dashboard', sref: 'dashboard.overview'},
    {name: 'ResearchMaps', sref: 'dashboard.research.maps' },
    {name: 'ResearchVariables', sref: 'dashboard.research.variables'},
    {name: 'Plots Researcher', sref: 'dashboard.research.plots'},
    {name: 'Crop Session Detail', sref: 'dashboard.cropSession.detail({cropSessionId: 1})'},
    {name: 'CropSessions', sref: 'dashboard.cropSessions'},
    {name: 'User Profile', sref: 'dashboard.profile'}
  ];
});
