'use strict';

var _ = require('lodash');
var moment = require('moment');
var locationMapper = require('../../../lib/helpers/locationMapper');

var startMoment = moment('2014-01-01');
var endMoment = moment('2014-01-02');

var ROWS = 101,
  COLUMNS = 210;
// var ROWS = 20,
//   COLUMNS = 10;

var createdAt = moment().toISOString();

function createData(variableName, dataDate) {
  var data = [];
  for(var row=0; row < ROWS; row++) {
    for(var column=0; column< COLUMNS; column++) {
      data.push({
        variableName: variableName,
        matrixRow: row,
        matrixColumn: column,
        dataValue: _.random(0, 10),
        dataDate: dataDate,
        createdAt: createdAt,
        latitude: locationMapper.getLatitude(row),
        longitude: locationMapper.getLongitude(column)
      });
    }
  }

  return data;
}

function createDataFor(variableName, startMoment, endMoment) {
  var tempMoment = moment(startMoment);

  var createdData = [];
  while(!tempMoment.isAfter(endMoment)) {
    createdData.push.apply(createdData, createData(variableName, tempMoment.toISOString()));
    tempMoment.add('days', 1);
  }

  return createdData;
}

var rainfall = createDataFor('rainfall', startMoment, endMoment);
var referenceEt = createDataFor('reference_ET_PenmanMonteith', startMoment, endMoment);
exports.goesData = rainfall.concat(referenceEt);

exports.goesDataOptions = {
  startMoment: startMoment,
  endMoment: endMoment,
  days: endMoment.diff(startMoment, 'days') + 1,
  rowsPerDay: ROWS * COLUMNS
};
