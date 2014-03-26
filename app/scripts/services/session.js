'use strict';

angular.module('pragmaApp')
.service('Session', function (Restangular) {
  var session = Restangular.all('session');

  var self = this;
  /**
   * Authenticated user
   * @type {Object}
   */
  this.user = null;

  /**
   * Authenticates the user
   * @param  {Object} credentials User's email and password.
   * @return {Promise}
   */
  this.login = function(credentials) {
    return session.post(credentials).then(function(user) {
      self.user = user;
      return user;
    });
  };

  this.logout = function() {

    return session.remove().then(function() {
      self.user = null;
      return true;
    });
  };
});
