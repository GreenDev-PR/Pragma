'use strict';

angular.module('pragmaApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
