'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    userType: {
      type: DataTypes.ENUM('farmer', 'researcher'),
      allowNull: false,
      validate: {
        isIn: [['farmer', 'researcher']],
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    farmLatitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true
      }
    },
    farmLongitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true
      }
    }
  }, {
    validate: {
      farmerCoordinates: function() {
        var hasCoords = this.farmLatitude && !isNaN(this.farmLatitude) &&
            this.farmLongitude && !isNaN(this.farmLongitude);
        if(this.userType === 'farmer' && !hasCoords) {
          throw new Error('Farmer must have the farm\'s location defined');
        }
      }
    },
    classMethods: {
      hashPassword: function(password, done) {
        bcrypt.hash(password, 8, done);
      }
    },
    instanceMethods: {
      verifyPassword: function(password, done) {
        return bcrypt.compare(password, this.password, function(err, res) {
          return done(err, res);
        });
      },
      getJSON: function() {
        var values = this.values;
        delete values.password;
        return values;
      }
    }
  });

  return User;
};
