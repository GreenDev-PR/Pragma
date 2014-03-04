'use strict';

angular.module('pragmaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/projectPages.html',
    controller: 'ProjectPagesCtrl'
  })
  .when('/landingPage', {
    templateUrl: 'partials/landing.html',
    bodyClass: 'landing-page'
  }).when('/login', {
    templateUrl: 'partials/login.html',
    bodyClass: 'pragma'
  }).when('/signup-researcher', {
    templateUrl: 'partials/signup-researcher.html',
    bodyClass: 'pragma'
  }).when('/signup-farmer', {
    templateUrl: 'partials/signup-farmer.html',
    controller: 'signupFarmerCtrl',
    bodyClass: 'pragma'
  }).when('/farmer-overview', {
    templateUrl: 'partials/farmer-overview.html',
    controller: 'FarmerOverviewCtrl',
    bodyClass: 'pragma'
  })
  .otherwise({
    redirectTo: '/'
  });
}).run(function() {
      // animation for landing page sections
      // 
      console.log('running ');
      $('a[href^="#"]').click(function() {
        $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top
        }, 700);
        return false;
      });
    })
.run(['$location', '$rootScope', function($location, $rootScope) {
  console.log('running 2');

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    if (current.$$route) {
      $rootScope.bodyClass = current.$$route.bodyClass;
    }
  });
}]);
