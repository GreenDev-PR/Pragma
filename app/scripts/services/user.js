'use strict';

angular.module('pragmaApp')
.service('User', function (Restangular) {
  var user = Restangular.all('users');

  this.register = function(userToRegister) {
    return user.post(userToRegister);
  };

  this.getMe = function() {
    return user.get('me');
  };
});
