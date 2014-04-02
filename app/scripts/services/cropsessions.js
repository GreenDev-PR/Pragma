'use strict';

angular.module('pragmaApp')
.service('CropSessions', function (Restangular) {

  var cropSessions = Restangular.all('users/me/cropSessions');
  this.getAll = function() {
    return cropSessions.getList();
  };

  this.create = function(cropSession) {
    return cropSessions.post(cropSession);
  };

  this.get = function(id) {
    return cropSessions.get(id);
  };
});
