'use strict';

angular.module('pragmaApp')
.service('CropTypes', function CropTypes(Restangular, $q) {
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

  this.getAllWithCropData = function() {
    var cropTypesPromise = this.getAll();

    var joined = cropTypesPromise.then(function(cropTypes) {
      var promises = cropTypes.map(function(cropType) {
        return cropType.getList('cropData').then(function(cropData) {
          cropType.cropData = Restangular.stripRestangular(cropData[0]);
        });
      });

      return $q.all(promises);
    });

    return joined.then(function() {
      return cropTypesPromise;
    });
  };

  this.getCropType = function(cropTypeId, cropTypes) {
    for(var i=0; i < cropTypes.length; i++) {
      if(cropTypes[i].id === cropTypeId) {
        return cropTypes[i];
      }
    }

    return null;
  };
});
