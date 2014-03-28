'use strict';

angular.module('pragmaApp')
  .factory('variables', function (Restangular) {


    return {
      getAll: function() {
        return Restangular.all('research/variables').getList();
      },
      getDataFor: function(variableName) {
        return Restangular.one('research/variables', variableName).getList('data');
      },
      getMapsFor: function(variableName, startDate, endDate) {
        var queryParams = {};
        if(startDate) {
          queryParams.startDate = startDate;
          if(endDate) {
            queryParams.endDate = endDate;
          }
        }
        return Restangular.one('research/variables', variableName)
            .getList('map', {startDate: startDate, endDate: endDate});
      }
    };
  });
