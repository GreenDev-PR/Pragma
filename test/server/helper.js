'use strict';

var _ = require('lodash');
var util = require('util');

var filterSequelize = function(obj){
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

function error(msg, expected, actual) {
  var err = new Error(msg);
  err.expected = expected;
  err.actual = actual;
  err.showDiff = true;
  return err;
}

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
