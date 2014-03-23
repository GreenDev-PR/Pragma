'use strict';

angular.module('pragmaApp')
  .factory('variables', function (Restangular) {

    var variables = Restangular.all('research/variables');

    return {
      getAll: function() {
        return variables.getList();
      },
      getDataFor: function(variableName) {
        return variables.one(variableName).getList('data');
      },
      getMapsFor: function(variableName) {
        return variables.one(variableName).getList('map');
      }
    };
  });
