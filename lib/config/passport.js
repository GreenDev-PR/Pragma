'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  // TODO
  // User.findOne({
  //   _id: id
  // }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
  //   done(err, user);
  // });
  done(null, {});
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    // TODO: Authenticate user
    // User.findOne({
    //   email: email
    // }, function(err, user) {
    //   if (err) return done(err);
      
    //   if (!user) {
    //     return done(null, false, {
    //       message: 'This email is not registered.'
    //     });
    //   }
    //   if (!user.authenticate(password)) {
    //     return done(null, false, {
    //       message: 'This password is not correct.'
    //     });
    //   }
    //   return done(null, user);
    // });
  }
));

module.exports = passport;