'use strict';

var createUsers = function() {
  var users = [];

  for (var i = 1; i <= 10; i++) {
    users.push({
      id: i,
      name: 'Name' + i,
      lastName: 'Lastname' + i ,
      email: 'email' + i + '@test.com',
      password: 'incredibly_difficult_password' + i,
      userType: (i % 2 === 0 ? 'farmer' : 'researcher'),
      farmLatitude: (i % 2 === 0 ?  18.229351 : null),
      farmLongitude: (i % 2 === 0 ? -66.453767 : null),
      organization: 'An organization' + i,
    });
  }

  return users;
};

exports.data = {
  users: createUsers()
};