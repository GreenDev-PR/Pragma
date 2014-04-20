'use strict';

angular.module('pragmaApp').factory('weatherService', function ($q) {
  return {
    getWeather: function (location) {
      var deferred = $q.defer();

      $.simpleWeather({
        location: location,
        woeid: '',
        unit: 'f',
        success: function(weather) {
          deferred.resolve(weather);
        },
        error: function(error) {
          deferred.reject(error);
        }
      });

      return deferred.promise;
    }
  };
});
