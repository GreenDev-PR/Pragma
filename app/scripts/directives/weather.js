'use strict';

angular.module('pragmaApp').directive('weather', function (weatherService) {
  return {
    templateUrl: 'views/partials/weatherWidget.html',
    restrict: 'E',
    scope: {
      location: '='
    },
    replace: true,
    link: function postLink(scope) {
      scope.weather = null;
      
      scope.$watch('location', function() {
        if(scope.location) {
          weatherService.getWeather(scope.location).then(function(weather) {
            scope.weather = weather;
          });
          
        }
      }, true);
    }
  };
});
