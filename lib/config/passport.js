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
  // TODO
  User.find({where: {id: id}}).then(function(user) {
    done(null, user);
  }, done);
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.find({where: {email: email}}).then(function(user) {
      if(user) {
        user.verifyPassword(password, function(err, res) {
          if(err) {
            done(err);
          } else if(!res) {
            done(null, false, {message: 'Incorrect password'});
          } else {
            delete user.values.password;
            done(null, user.values);
          }
        });
      } else {
        done(null, false, {message: 'Emails is not registered'});
      }

    });
  }
));

module.exports = passport;
