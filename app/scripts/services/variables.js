'use strict';

angular.module('pragmaApp')
  .factory('variables', function (Restangular) {


    return {
      getAll: function() {
        return Restangular.all('research/variables').getList();
      },
      getDataFor: function(variableName, timeRange, coordinates) {
        coordinates = coordinates || {};
        timeRange = timeRange || {};
        return Restangular.one('research/variables', variableName).getList('data', {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          startDate: timeRange.startDate,
          endDate: timeRange.endDate
        });
      },
      getMapsFor: function(variableName, startDate, endDate) {
        var queryParams;
        if(startDate) {
          queryParams = {};
          queryParams.startDate = startDate;
          if(endDate) {
            queryParams.endDate = endDate;
          }
        }
        return Restangular.one('research/variables', variableName)
            .getList('map', queryParams);
      }
    };
  });
