'use strict';

angular.module('pragmaApp').controller('ProjectPagesCtrl',function($scope) {
  $scope.links = [
    {name: 'Login', sref: 'login'},
    {name: 'Landing Page', sref: 'landingPage'},
    {name: 'Sign Up Researcher', sref: 'signup-researcher'},
    {name: 'Sign Up Farmer', sref: 'signup-farmer'},
    {name: 'Dashboard', sref: 'dashboard.overview'},
    {name: 'ResearchMaps', sref: 'dashboard.researchMaps' },
    {name: 'ResearchVariables', sref: 'dashboard.researchVariables'},
    {name: 'Plots Researcher', sref: 'dashboard.researchPlots'},
    {name: 'Crop Session Detail', sref: 'dashboard.cropSession.detail({cropSessionId: 1})'}
  ];
});
