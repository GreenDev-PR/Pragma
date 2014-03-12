'use strict';

var fs = require('fs');
var factory = require('rosie').Factory;
var _ = require('lodash');

var data = {};
// load all the factories
fs.readdirSync(__dirname).forEach(function(file) {
  console.log(file);
  if(file !== 'index.js') {
    _.extend(data, require('./' + file));
  }
});

exports.data = data;

exports.factory = factory;
