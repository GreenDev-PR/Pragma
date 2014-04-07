'use strict';

angular.module('pragmaApp')
.service('CropSessions', function (Restangular) {

  var cropSessionEndpoint = 'users/me/cropSessions';
  var cropSessions = Restangular.all(cropSessionEndpoint);

  this.getAll = function() {
    return cropSessions.getList();
  };

  this.create = function(cropSession) {
    return cropSessions.post(cropSession);
  };

  this.get = function(id) {
    return cropSessions.get(id);
  };

  this.remove = function(id) {
    return Restangular.one(cropSessionEndpoint, id).remove();
  };

  this.calculateIrrigation = function(id, lastIrrigationDate) {
    return Restangular.one(cropSessionEndpoint, id).customGET('calculateIrrigation', {lastIrrigationDate: lastIrrigationDate});
  };
});
