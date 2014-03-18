'use strict';

var _ = require('lodash');
var moment = require('moment');

var startMoment = moment('2014-01-01');
var endMoment = moment('2014-01-03');

// var ROWS = 210,
//   COLUMNS = 101;
var ROWS = 20,
  COLUMNS = 10;

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
        createdAt: createdAt
      });
    }
  }

  return data;
}

function createDataFor(variableName, startMoment, endMoment) {
  var tempMoment = moment(startMoment);

  var monthData = [];
  while(!tempMoment.isAfter(endMoment)) {
    monthData.push.apply(monthData, createData(variableName, tempMoment.toISOString()));
    console.log('pushed');
    tempMoment.add('days', 1);
  }

  return monthData;
}

exports.goesData = createDataFor('rainfall', startMoment, endMoment);

exports.goesDataOptions = {
  startMoment: startMoment,
  endMoment: endMoment,
  days: endMoment.diff(startMoment, 'days') + 1,
  rowsPerDay: ROWS * COLUMNS
};
