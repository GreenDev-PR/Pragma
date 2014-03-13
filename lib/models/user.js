'use strict';

var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var hash = Promise.promisify(bcrypt.hash, bcrypt);
var comparePassword = Promise.promisify(bcrypt.compare, bcrypt);

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
      hashPassword: function(password) {
        return hash(password, 8);
      }
    },
    instanceMethods: {
      verifyPassword: function(password) {
        return comparePassword(password, this.password);
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
