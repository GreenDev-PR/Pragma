'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true
    },
    userType: {
      type: DataTypes.ENUM('farmer', 'researcher'),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true
    },
    farmLatitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    farmLongitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    associate: function(models) {

    }
  });

  return User;
};
