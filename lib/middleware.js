'use strict';

/**
*  Protect routes on your api from unauthenticated access
*/
exports.auth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};

/**
* Set a cookie for angular so it knows we have an http session
*/
exports.setUserCookie = function(req, res, next) {
  if(req.user) {
    res.cookie('user', JSON.stringify(req.user.userInfo));
  }
  next();
};
