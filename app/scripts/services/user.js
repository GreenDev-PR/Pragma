'use strict';

angular.module('pragmaApp')
.service('User', function (Restangular) {
  var user = Restangular.all('users');

  this.create = function(user) {
    return user.post(user);
  };

  this.getMe = function() {
    return user.get('me');
  };

});
