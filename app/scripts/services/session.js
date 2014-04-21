'use strict';

angular.module('pragmaApp')
.service('Session', function (Restangular, $sessionStorage) {
  var session = Restangular.all('session');

  // console.log('the user cookie', $sessionStorage.user);
  var self = this;
  /**
   * Authenticated user
   * @type {Object}
   */
  this.user = $sessionStorage.user || {};

  /**
   * Authenticates the user
   * @param  {Object} credentials User's email and password.
   * @return {Promise}
   */
  this.login = function(credentials) {
    return session.post(credentials).then(function(user) {
      self.user = user;
      $sessionStorage.user = user;
      return user;
    });
  };

  this.logout = function() {

    return session.remove().then(function() {
      self.user = {};
      $sessionStorage.user = {};
      return true;
    });
  };
});
