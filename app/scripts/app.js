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
    controller: 'LoginCtrl',
    bodyClass: 'pragma'
  })
  .state('showcase', {
    url: '/showcase',
    templateUrl: 'partials/projectPages.html',
    controller: 'ProjectPagesCtrl'
  })
  .state('landingPage', {
    url: '/',
    templateUrl: 'partials/landing.html',
    bodyClass: 'landing-page'
  })
  .state('signup-farmer', {
    url: '/signup-farmer',
    templateUrl: 'partials/signupFarmer.html',
    controller: 'signupFarmerCtrl'
  })
  .state('signup-researcher', {
    url:'/signup-researcher',
    templateUrl: 'partials/signupResearcher.html'
  })
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('dashboard.overview',  {
    url: '/overview',
    templateUrl: 'partials/farmerOverview.html',
    controller: 'FarmerOverviewCtrl'
  });

  $urlRouterProvider.otherwise('/');
})
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
})
.run(['$location', '$rootScope', function($location, $rootScope) {

  $rootScope.$on('$stateChangeSuccess', function (event, current) {
    $rootScope.bodyClass = current.bodyClass || 'pragma';
  });

}]);
