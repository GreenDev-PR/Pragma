'use strict';

var factory = require('rosie').Factory;
var moment = require('moment');
var _ = require('lodash');

factory.define('IrrigationEvent')
.sequence('cropSessionId')
.attr('irrigationDate', function() { return moment().toString(); })
.attr('irrigationVolume', function() { return _.random(0, 10); });

var createIrrigationEvents = function(number) {
  var data = [];
  _.times(number, function() {
    data.push(factory.build('IrrigationEvent'));
  });

  return data;
};

exports.irrigationEvents = createIrrigationEvents(10);
