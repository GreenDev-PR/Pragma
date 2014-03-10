'use strict';

var fs = require('fs');
var factory = require('rosie').Factory;
var _ = require('lodash');

fs.readdirSync(__dirname).forEach(function(file) {
  console.log(file);
  if(file !== 'index.js') {
    require('./' + file);
  }
});

exports.data = {
  users: (function() {
    var users =  [];
    for(var i= 0; i < 10; i++) {
      users.push(factory.build('user'));
    }

    return users;
  }()),
  getUser: function(index) {
    var user = _.cloneDeep(this.users[index]);
    delete user.password;
    return user;
  }
};

exports.factory = factory;
