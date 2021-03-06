'use strict';

var _ = require('lodash');
var util = require('util');
var moment = require('moment');

/**
 * Removes sequelize timestamps from the object.
 * @param  {Object} obj Object to remove timestamps
 * @return {Object}
 */
var filterSequelize = function(object){
  if(_.isArray(object)) {
    _.forEach(object, function(obj) {
      delete obj.createdAt;
      delete obj.updatedAt;
    });
  } else {
    delete object.createdAt;
    delete object.updatedAt;
  }
  return object;
};

var transformDataDate = function(object) {
  if(_.isArray(object)) {
    _.forEach(object, function(obj) {
      obj.dataDate = moment(obj.dataDate).toString();
    });
  } else {
    object.dataDate = moment(object.dataDate).toString();
  }
};

var transformSequelizeAndDataDate = function(body, expected) {
  filterSequelize(body);
  transformDataDate(body);
  transformDataDate(expected);
};

var transformSequelizeAndId = function(body) {
  filterSequelize(body);
  if(_.isArray(body)) {
    _.forEach(body, function(obj) {
      delete obj.id;
    });
  } else {
    delete body.id;
  }
};

function error(msg, expected, actual) {
  var err = new Error(msg);
  err.expected = expected;
  err.actual = actual;
  err.showDiff = true;
  return err;
}

/**
 * Transform both the body and expected objects using the passed transform function and compares for equality.
 */
var transformAndCompare = function(expected, done, transform) {
  return function(err, res) {
    if(err) {
      done(err);
    } else {
      var body = res.body;

      transform(body, expected);

      if(_.isEqual(expected, body)) {
        done();
      } else {
        var a = util.inspect(expected);
        var b = util.inspect(body);
        done(error('expected ' + a + 'got ' + b, a, b));
      }
    }
  };
};

/**
 * Compares the body of the response with the expected body.
 * It removes the sequelize timestamps from the response body.
 * @param  {Object}   expected Expected body.
 * @param  {Function} done     done callback
 */
exports.isBodyEqual = function(expected, done) {
  return transformAndCompare(expected, done, filterSequelize);
};

exports.isGoesBodyEqual = function(expected, done) {
  return transformAndCompare(expected, done, transformSequelizeAndDataDate);
};

exports.isGoesDataBodyEqual = function(expected, done) {
  return transformAndCompare(expected, done, function(body, expected) {
    transformSequelizeAndDataDate(body, expected);
    filterSequelize(expected);
    if(_.isArray(body)) {
      _.forEach(body, function(obj) {
        delete obj.id;
      });
    } else {
      delete body.id;
    }
  });
};

exports.isEqualWithoutIdAndTimestamps = function(expected, done) {
  return transformAndCompare(expected, done, transformSequelizeAndId);
};

