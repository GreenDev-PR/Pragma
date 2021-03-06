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
  'ui.jq',
  'highcharts-ng',
  'ngStorage',
  'chieffancypants.loadingBar',
  'ngAnimate'
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, USER_ROLES) {
  $locationProvider.html5Mode(true);

  var all = [USER_ROLES.guest, USER_ROLES.researcher, USER_ROLES.farmer];
  var farmerAndResearcher = all.slice(1);

  $stateProvider
  .state('showcase', {
    url: '/showcase',
    templateUrl: 'partials/projectPages.html',
    controller: 'ProjectPagesCtrl',
    data: {
      authorizedRoles: all
    }
  })
  .state('landingPage', {
    url: '/',
    templateUrl: 'partials/landing.html',
    bodyClass: 'landing-page',
    data: {
      authorizedRoles: all
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl',
    data: {
      authorizedRoles: all
    }
  })
  .state('signup-farmer', {
    url: '/signup-farmer',
    templateUrl: 'partials/signupFarmer.html',
    controller: 'SignupFarmerCtrl',
    data: {
      authorizedRoles: all
    }
  })
  .state('signup-researcher', {
    url:'/signup-researcher',
    templateUrl: 'partials/signupResearcher.html',
    controller: 'SignupCtrl',
    data: {
      authorizedRoles: all
    }
  })
  // dashboard
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardCtrl',
    data: {
      authorizedRoles: farmerAndResearcher
    }
  })
  .state('dashboard.overview', {
    url: '/overview',
    templateUrl: 'partials/farmerOverview.html',
    controller: 'FarmerOverviewCtrl'
  })
  // Research
  .state('dashboard.research', {
    url: '/research',
    abstract: true,
    template: '<div ui-view=""></div>',
    resolve: {
      resolvedVariables: function(variables) {
        return variables.getAll();
      }
    }
  })
  .state('dashboard.research.maps', {
    url: '/maps',
    templateUrl: 'partials/researchMaps.html',
    controller: 'ResearchMapsCtrl'
  })
  .state('dashboard.research.variables', {
    url: '/variables',
    templateUrl: 'partials/researchVariablesTable.html',
    controller: 'ResearchVariablesCtrl'
  })
  .state('dashboard.research.plots', {
    url:'/plots',
    templateUrl: 'partials/plotsResearcher.html',
    controller: 'PlotsResearcherCtrl'
  })
  // Crop sessions
  .state('dashboard.cropSessions', {
    abstract: true,
    url: '/cropSessions',
    template: '<div ui-view=""></div>',
    resolve: {
      cropTypes: function(CropTypes) {
        return CropTypes.getAllWithCropData();
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.farmer]
    },
  })
  .state('dashboard.cropSessions.manage', {
    url: '/manage',
    templateUrl: 'partials/cropSessions.html',
    controller: 'CropSessionsCtrl',
    resolve: {
      cropSessionsData: function(CropSessions) {
        return CropSessions.getAll();
      }
    }
  })
  .state('dashboard.cropSessions.cropSession', {
    url: '/cropSession',
    abstract: true,
    templateUrl: 'partials/cropSession.html',
    controller: function($scope) {
      // shared data
      $scope.data = {};
    }
  })
  .state('dashboard.cropSessions.cropSession.detail', {
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
          irrigationEventsData: function (CropSessions, cropSession) {
            return CropSessions.getAllIrrigationEvents(cropSession.id);
          }
        }
      }
    }
  })
  .state('dashboard.profile', {
    url:'/profile',
    resolve: {
      user: function(User) {
        return User.getMe();
      }
    },
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
      var authorizedRoles = USER_ROLES.guest;
      if(state.data && state.data.authorizedRoles) {
        authorizedRoles = state.data.authorizedRoles;
      }

      return authorizedRoles;
      // console.log(state);
      // return [USER_ROLES.guest, USER_ROLES.farmer, USER_ROLES.researcher];
    }

    var authorizedRoles = getAuthorizedRoles(toState);
    if (!Auth.isAuthorized(authorizedRoles)) {
      console.log('not authorized', authorizedRoles, Auth.getUserRole());
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

})
.run(function($window) {
  $($window).bind('load resize', function() {
    var width = ($window.innerWidth > 0) ? $window.innerWidth : $window.screen.width;
    if (width < 768) {
      $('div.sidebar-collapse').addClass('collapse');
    } else {
      $('div.sidebar-collapse').removeClass('collapse');
    }
  });
});
