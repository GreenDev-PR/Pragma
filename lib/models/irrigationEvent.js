'use strict';

var moment = require('moment');
var _ = require('lodash');

var isNumber = function(value) {
  if(!_.isNumber(value)) {
    throw new Error('Only numbers allowed');
  }
};

module.exports = function(sequelize, DataTypes) {
  var IrrigationEvent = sequelize.define('IrrigationEvent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cropSessionId: {
      type: DataTypes.INTEGER,
      references: 'CropSessions',
      referencesKey: 'id'
    },
    irrigationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function() {
        return moment(this.getDataValue('irrigationDate')).toISOString();
      }
    },
    irrigationVolume: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumber: isNumber
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        IrrigationEvent.belongsTo(models.CropSession, {foreignKey: 'cropSessionId'});
      }
    }
  });

  return IrrigationEvent;
};
