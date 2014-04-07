'use strict';
var moment = require('moment');
var _ = require('lodash');

var isNumber = function(value) {
  if(!_.isNumber(value)) {
    throw new Error('Only numbers allowed');
  }
};

module.exports = function(sequelize, DataTypes) {
  var CropSession = sequelize.define('CropSession', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
      unique: true
    },
    cropName: {
      type: DataTypes.STRING,
      unique: true
    },
    cropTypeId: {
      type: DataTypes.INTEGER,
      references: 'CropTypes',
      referencesKey: 'id'
    },
    area: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function() {
        return moment(this.getDataValue('startDate')).toString();
      }
    },
    initialStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    developmentStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    midStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    lateStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    kcInitial: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumber: isNumber
      }
    },
    kcMid: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumber: isNumber
      }
    },
    kcEnd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumber: isNumber
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        CropSession.belongsTo(models.User, {foreignKey: 'userId'});
        CropSession.belongsTo(models.CropType, {foreignKey: 'cropTypeId'});

        CropSession.hasMany(models.IrrigationEvent, {foreignKey: 'cropSessionId'});
      }
    }
  });

  return CropSession;
};
