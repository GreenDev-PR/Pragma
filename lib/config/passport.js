'use strict';

var passport = require('passport'),
    User = require('../models').User,
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.find({where: {id: id}}).then(function(user) {
    done(null, user.getJSON());
  }, done);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.find({where: {email: email}}).then(function(user) {
      if(user) {

        user.verifyPassword(password).then(function(isEqual) {
          if(isEqual) {
            done(null, user.getJSON());
          } else {
            done(null, false, 'Incorrect password');
          }

        }).error(done);

      } else {
        done(null, false, 'Email is not registered');
      }

    }, done);
  }
));

module.exports = passport;
