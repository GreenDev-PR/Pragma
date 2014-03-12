'use strict';

var factory = require('rosie').Factory;
var Faker = require('Faker');
var i = 0;

factory.define('GoesVariable')
.attr('variableName', function() {
  return Faker.definition.first_name[i++];
});
