'use strict';

angular.module('pragmaApp')
.service('Geocoder', function Geocoder($q) {
  var geocoder = new google.maps.Geocoder();

  this.geocode = function(request) {
    var d = $q.defer();
    geocoder.geocode(request, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        d.resolve(results);
      } else {
        d.reject(status);
      }
    });
    return d.promise;
  };
});
