'use strict';

var RESOLUTION = 0.00899281;
var LATITUDE = 17.8;
var LONGITUDE = -67.3;

/**
 * Converts a given matrix row index into a latitude
 * @param  {Number} row matrix row number zero based
 * @return {Number} latitude mapped to the row number
 */
exports.getLatitude = function(row) {
  return LATITUDE + (RESOLUTION * row);
};

/**
 * Converts a given matrix column index into a longitude
 * @param  {Number} column matrix column number zero based
 * @return {Number} longitude mapped to the column number
 */
exports.getLongitude = function(column) {
  return LONGITUDE + (RESOLUTION * column);
};

/**
 * Converts a given longitude into a matrix column index
 * @param  {Number} longitude longitude to convert
 * @return {Number} matrix column index for the given longitude
 */
exports.getColumn = function(longitude) {
  return Math.round(Math.abs(LONGITUDE-longitude)/RESOLUTION);
};

/**
 * Converts a given latitude into a matrix row index
 * @param  {Number} latitude latitude to convert
 * @return {Number} matrix row index for the given latitude
 */
exports.getRow = function(latitude) {
  return Math.round(Math.abs(LATITUDE-latitude)/RESOLUTION);
};