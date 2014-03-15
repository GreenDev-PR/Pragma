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

function error(msg, expected, actual) {
  var err = new Error(msg);
  err.expected = expected;
  err.actual = actual;
  err.showDiff = true;
  return err;
}

/**
 * Compares the body of the response with the expected body.
 * It removes the sequelize timestamps from the response body.
 * @param  {Object}   expected Expected body.
 * @param  {Function} done     done callback
 */
exports.isBodyEqual = function(expected, done) {
  return function(err, res) {
    if(err) {
      done(err);
    } else {
      var body = res.body;
      filterSequelize(body);

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

exports.isGoesBodyEqual = function(expected, done) {
  return function(err, res) {
    if(err) {
      done(err);
    } else {
      var body = res.body;
      filterSequelize(body);
      transformDataDate(body);

      transformDataDate(expected);

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


