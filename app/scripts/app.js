'use strict';

angular.module('pragmaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'google-maps',
  'restangular',
  'geolocation',
  'restangular',
  'ui.bootstrap',
  'highcharts-ng'
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('showcase', {
    url: '/',
    templateUrl: 'partials/projectPages.html',
    controller: 'ProjectPagesCtrl'
  })
  .state('landingPage', {
    url: '/landing',
    templateUrl: 'partials/landing.html',
    bodyClass: 'landing-page'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl',
    bodyClass: 'pragma'
  })
  .state('signup-farmer', {
    url: '/signup-farmer',
    templateUrl: 'partials/signupFarmer.html',
    controller: 'SignupFarmerCtrl'
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
  .state('dashboard.researchMaps', {
    url: '/research-maps',
    templateUrl: 'partials/researchMaps.html',
    controller: 'ResearchMapsCtrl'
  })
  .state('dashboard.researchVariables', {
    url: '/research-variables',
    templateUrl: 'partials/researchVariablesTable.html',
    controller: 'ResearchVariablesCtrl'
  })
  .state('dashboard.researchPlots', {
    url:'/plots-researcher',
    templateUrl: 'partials/plotsResearcher.html',
    controller: 'PlotsResearcherCtrl'
  })
  .state('dashboard.cropSession', {
    url: '/cropSession',
    abstract: true,
    templateUrl: 'partials/cropSession.html',
    controller: 'CropSessionCtrl'
  })
  .state('dashboard.cropSession.detail', {
    url:'/detail/:cropSessionId',
    resolve: {
      cropSession: function($stateParams, CropSessions) {
        return CropSessions.get($stateParams.cropSessionId);
      }
    },
    views: {
      'summary': {
        templateUrl: 'partials/cropSession-summary.html',
        controller: 'SummaryCtrl'
      },
      'irrigationRequirement': {
        templateUrl: 'partials/cropSession-irrigationRequirement.html',
        controller: 'IrrigationrequirementCtrl'
      },
      'kc': {
        templateUrl: 'partials/cropSession-kc.html',
        controller: 'KcCtrl'
      },
      'irrigationHistory': {
        templateUrl: 'partials/cropSession-irrigationHistory.html',
        controller: 'IrrigationhistoryCtrl',
        resolve: {
          irrigationEvents: function(cropSession) {
            console.log('nest cropasdfdsfdsa', cropSession);
            return cropSession.getList('irrigationEvents');
          }
        }
      }
    }
  })
  .state('dashboard.cropSessions', {
    url: '/cropSessions',
    templateUrl: 'partials/cropSessions.html',
    controller: 'CropSessionsCtrl'
  })
  .state('dashboard.profile', {
    url:'/profile',
    templateUrl: 'partials/userProfile.html',
    controller: 'UserProfileCtrl'
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
      // var authorizedRoles = USER_ROLES.guest;
      // if(state.data && state.data.authorizedRoles) {
      //   authorizedRoles = state.data.authorizedRoles;
      // }

      // return authorizedRoles;
      console.log(state);
      return [USER_ROLES.guest, USER_ROLES.farmer, USER_ROLES.researcher];
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
// .controller('paginationCtrl', angular.noop);
