'use strict';

angular.module('pragmaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'google-maps',
  'restangular',
  'ui.bootstrap'
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
    // TODO UNCOMMENT FOR PRODUCTION
    // data: {
    //   authorizedRoles: [USER_ROLES.farmer, USER_ROLES.researcher]
    // }
  })
  .state('dashboard.overview', {
    url: '/overview',
    templateUrl: 'partials/farmerOverview.html',
    controller: 'FarmerOverviewCtrl'
  })
  .state('dashboard.research-maps', {
    url: '/research-maps',
    templateUrl: 'partials/researchMaps.html',
    controller: 'ResearchMapsCtrl'
  })
  .state('dashboard.research-variables', {
    url: '/research-variables',
    templateUrl: 'partials/researchVariablesTable.html',
    controller: 'ResearchVariablesCtrl'
  });

  $urlRouterProvider.otherwise('/');
})
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
.run(function($rootScope, Auth, AUTH_EVENTS, USER_ROLES) {

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    function getAuthorizedRoles(state) {
      var authorizedRoles = USER_ROLES.guest;
      if(state.data && state.data.authorizedRoles) {
        authorizedRoles = state.data.authorizedRoles;
      }

      return authorizedRoles;
    }

    var authorizedRoles = getAuthorizedRoles(toState);
    if (!Auth.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (Auth.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });

  $rootScope.$on('$stateChangeSuccess', function (event, current) {
    $rootScope.bodyClass = current.bodyClass || 'pragma';
  });

});
