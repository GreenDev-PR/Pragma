'use strict';

var db = require('../models');
var errors = require('errors');
var _ = require('lodash');

/**
 *  Gets the specified user with
 */
exports.find = function (req, res, next) {
  var userId = req.params.userId;

  if(userId === 'me') {
    var user = req.user;
    if(user) {
      req.dbUser = user;
      return next();
    } else {
      return next(new errors.Http401Error());
    }
  }

  db.User.find(userId).then(function(user) {
    if(user) {
      req.dbUser = user;
      next();
    } else {
      next(new errors.Http404Error('User not found', 'User id is not in the database',
        'Supply an id that is in the database'));
    }
  }, function(err) {
    next(new errors.DatabaseError(err.mess));
  });

};

exports.create = function(req, res, next) {
  var body = req.body;
  delete body.id;

  var user = db.User.build(body);
  var userErrors = user.validate();
  if(userErrors) {
    next(new errors.ValidationError(null, userErrors));
  } else {

    db.User.find({where: {email: body.email}}).then(function(user) {
      if(user) {
        next(new errors.Http400Error('User already exists'));
      } else {

        // Hash the user's password and store it in the database.
        db.User.hashPassword(body.password).then(function(hashed) {
          body.password = hashed;
          return db.User.create(body);
        }).then(function(user) {
          res.json(201, user.getJSON());
        }).error(function(err) {
          next(new errors.DatabaseError(err.message));
        });
      }

    }).error(function(err) {
      next(new errors.DatabaseError(err.message));
    });
  }
};

exports.show = function(req, res) {
  res.json(req.dbUser.getJSON());
};

//Crop Sessions

exports.getCropSessions = function(req, res, next) {
  req.dbUser.getCropSessions()
  .then(function(cropSessions) {
    res.json(cropSessions);
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

exports.createCropSession = function(req, res, next) {
  req.body.userId = req.dbUser.id;
  delete req.body.id;
  var cropSession = db.CropSession.build(req.body);
  var cropSessionErrors = cropSession.validate();
  if(cropSessionErrors) {
    next(new errors.ValidationError(null, cropSessionErrors));
  } else {
    db.CropSession.create(req.body).then(function(cropSession) {
      var values = cropSession.selectedValues;
      values.id = cropSession.id;
      res.json(201, values);
    })
    .error(function(err) {
      next(new errors.DatabaseError(err.message));
    });
  }
};

exports.findCropSession = function(req, res, next) {
  req.dbUser.getCropSessions({where: { id: req.params.cropSessionId }})
  .then(function(cropSessions) {
    if(!_.isEmpty(cropSessions)) {
      req.cropSession = cropSessions[0];
      next();
    } else {
      next(new errors.Http404Error('Crop Session not found'));
    }
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

exports.showCropSession = function(req, res) {
  res.json(req.cropSession);
};

exports.destroyCropSession = function(req, res, next) {
  req.cropSession.destroy().then(function(cropSession) {
    console.log('destroy cropSession', cropSession);
    res.json(cropSession);
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};
// Irrigation events

exports.getIrrigationEvents = function(req, res, next) {
  req.cropSession.getIrrigationEvents()
  .then(function(irrigationEvents) {
    res.json(irrigationEvents);
  })
  .error(function(err) {
    next(new errors.DatabaseError(err.message));
  });
};

exports.createIrrigationEvent = function(req, res, next) {
  req.body.cropSessionId = req.cropSession.id;

  var irrigationEvent = db.IrrigationEvent.build(req.body);
  var irrigationEventErrors = irrigationEvent.build;

  if(irrigationEventErrors) {
    next(new errors.ValidationError(null, irrigationEventErrors));
  } else {
    irrigationEvent.save().then(function(irrigationEvent) {
      res.json(201, irrigationEvent.selectedValues);
    })
    .error(function(err) {
      next(new errors.DatabaseError(err.message));
    });
  }
};

exports.calculateIrrigationVolume = function(req, res, next) {
  // TODO calculate
  next();
};
