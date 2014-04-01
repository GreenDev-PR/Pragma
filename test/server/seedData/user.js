'use strict';

var factory = require('rosie').Factory;
var _ = require('lodash');

var names = ['Victor', 'Miguel', 'Jose'];
var lastNames = ['Rosario', 'Doe', 'Doer'];

factory.define('user')
.sequence('id')
.sequence('email', function(i) {
  return 'e' + i + '@test.com';
})
.sequence('password', function(i) {
  return 'pwd' + i;
})
.sequence('name', function(i) {
  return names[i % names.length];
})
.sequence('lastName', function(i) {
  return lastNames[i % lastNames.length];
})
.sequence('organization', function(i) {
  return 'Organization' + i;
})
.sequence('userType', function(i) {
  return i % 2 > 0 ? 'farmer' : 'researcher';
})
.sequence('farmLatitude', function(i) {
  return i % 2 > 0 ?  18.229351 : null;
})
.sequence('farmLongitude', function(i) {
  return i % 2 > 0 ? -66.453767 : null;
});


exports.users = (function() {
  var users =  [];
  for(var i= 0; i < 10; i++) {
    users.push(factory.build('user'));
  }

  return users;
}());

exports.getUser = function(index) {
  var user = _.cloneDeep(this.users[index]);
  delete user.password;
  return user;
};
