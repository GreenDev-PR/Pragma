'use strict';

angular.module('pragmaApp')
.service('CropSessions', function (Restangular) {

  var cropSessionEndpoint = 'users/me/cropSessions';
  var cropSessions = Restangular.all(cropSessionEndpoint);

  var data = { cropSessions: [], irrigationEvents: [] };

  this.getAll = function() {
    return cropSessions.getList().then(function(cropSessions) {
      data.cropSessions = cropSessions;
      return data;
    });
  };

  this.create = function(cropSession) {
    return cropSessions.post(cropSession).then(function(cropSession) {
      data.cropSessions.push(cropSession);
      return cropSession;
    });
  };

  this.get = function(id) {
    return cropSessions.get(id);
  };

  this.remove = function(id) {
    return Restangular.one(cropSessionEndpoint, id).remove().then(function(removedCropSession) {
      data.cropSessions = data.cropSessions.filter(function(cropSession) {
        return cropSession.id !== id;
      });

      return removedCropSession;
    });
  };

  this.calculateIrrigation = function(id, lastIrrigationDate) {
    return Restangular.one(cropSessionEndpoint, id).customGET('calculateIrrigation', {lastIrrigationDate: lastIrrigationDate});
  };

  this.getAllIrrigationEvents = function(cropSessionId) {
    return Restangular.one(cropSessionEndpoint, cropSessionId).all('irrigationEvents').getList().then(function(irrigationEvents) {
      data.irrigationEvents = irrigationEvents;
      return data;
    });
  };

  this.createIrrigationEvent = function(cropSessionId, irrigationEvent) {
    return Restangular.one(cropSessionEndpoint, cropSessionId).all('irrigationEvents')
        .post(irrigationEvent).then(function(createdIrrigationEvent) {
          data.irrigationEvents.push(createdIrrigationEvent);
          return createdIrrigationEvent;
        });
  };
});
