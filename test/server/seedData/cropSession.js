'use strict';

var factory = require('rosie').Factory;
var _ = require('lodash');
var moment = require('moment');

var randomInt = function() {
  return _.random(0, 10);
};

var randomFloat = function() {
  return _.random(0, 2, false);
};

factory.define('CropSession')
.sequence('userId', function(i) {
  return i % 11;
})
.sequence('cropName', function(i) {
  return 'CropName' + i;
})
.sequence('cropTypeId', function(i) {
  return i % 47;
})
.attr('area', randomInt)
.attr('startDate', function() { return moment().toISOString(); })
.attr('initialStageLength', randomInt)
.attr('developmentStageLength', randomInt)
.attr('midStageLength', randomInt)
.attr('lateStageLength', randomInt)
.attr('kcInitial', randomFloat)
.attr('kcMid', randomFloat)
.attr('kcEnd', randomFloat);


var createCropSessions = function(number) {
  var data = [];
  _.times(number, function() {
    data.push(factory.build('CropSession'));
  });

  return data;
};

exports.cropSessions = createCropSessions(10);
