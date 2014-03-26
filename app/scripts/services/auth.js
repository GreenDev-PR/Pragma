'use strict';

angular.module('pragmaApp')
.factory('Auth', function Auth($location, $rootScope, Session, AUTH_EVENTS, USER_ROLES) {

  return {
    /**
     * Authenticate user
     *
     * @param  {Object}   user     - login info
     * @return {Promise}
     */
    login: function(user) {
      return Session.login(user).then(function(user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
        return user;
      })
      .catch(function(err) {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed, err);
        throw err;
      });
    },

    /**
     * Unauthenticate user
     * @return {Promise}
     */
    logout: function() {
      return Session.logout().then(function() {
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        return true;
      })
      .catch(function(err) {
        $rootScope.$broadcast(AUTH_EVENTS.logoutFailed, err);
        return err;
      });
    },

    /**
     * Simple check to see if a user is logged in
     *
     * @return {Boolean}
     */
    isAuthenticated: function() {
      return !!Session.user;
    },

    isAuthorized: function(authorizedRoles) {
      if(!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      return (this.isAuthenticated() &&
          authorizedRoles.indexOf(Session.user.userType || USER_ROLES.guest) !== -1);
    }
  };
});
