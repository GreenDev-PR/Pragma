'use strict';

angular.module('pragmaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'google-maps',
  'restangular'
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    bodyClass: 'pragma'
  })
  .state('showcase', {
    url: '/',
    templateUrl: 'partials/projectPages.html',
    controller: 'ProjectPagesCtrl'
  })
  .state('landingPage', {
    url: '/landinPage',
    templateUrl: 'partials/landing.html',
    bodyClass: 'landing-page'
  })
  .state('signup-farmer', {
    url: '/signup-farmer',
    templateUrl: 'partials/signupFarmer.html',
    controller: 'signupFarmerCtrl',
    bodyClass: 'pragma'
  })
  .state('signup-researcher', {
    url:'/signup-researcher',
    templateUrl: 'partials/signupResearcher.html',
    bodyClass: 'pragma'
  })
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardCtrl',
    bodyClass: 'pragma'
  })
  .state('dashboard.overview',  {
    url: '/overview',
    templateUrl: 'partials/farmerOverview.html',
    controller: 'FarmerOverviewCtrl',
    bodyClass: 'pragma'
  });

  $urlRouterProvider.otherwise('/');
})
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
})
.run(['$location', '$rootScope', function($location, $rootScope) {

  $rootScope.$on('$stateChangeSuccess', function (event, current) {
    $rootScope.bodyClass = current.bodyClass;
  });

}]);
