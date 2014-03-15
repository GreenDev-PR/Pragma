'use strict';

var moment = require('moment');
var errors = require('errors');

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

/**
 * Sets the time range in req.timeRange.
 * Parses startDate and endDate from req.query if a startDate is specified if its valid
 * it will populate the time range property else it will call the next middleware with 400 error.
 */
exports.setTimeRange = function(req, res, next) {
  var startDate = req.query.startDate,
    endDate = req.query.endDate;

  if(startDate) {
    startDate = moment(startDate);
    endDate = moment(endDate);

    if(startDate.isValid() && endDate.isValid()) {
      req.timeRange = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
    } else {
      return next(new errors.Http400Error('One of the supplied dates or both are invalid'));
    }
  }

  next();
};
