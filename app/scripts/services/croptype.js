'use strict';

angular.module('pragmaApp')
.service('CropTypes', function Croptype(Restangular) {
  var cropTypes = Restangular.all('cropTypes');

  this.getAll = function() {
    return cropTypes.getList();
  };

  this.get = function(id) {
    return cropTypes.get(id);
  };

  this.getCropData = function(id) {
    return Restangular.one('cropTypes', id).getList('cropData');
  };
});

// /api/cropTypes/id
