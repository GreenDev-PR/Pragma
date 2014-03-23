'use strict';

var RESOLUTION = 0.00899281;
var LATITUDE = 17.8;
var LONGITUDE = -67.3;

exports.getLatitude = function(row) {
  return LATITUDE + (RESOLUTION * row);
};

exports.getLongitude = function(column) {
  return LONGITUDE + (RESOLUTION * column);
};
