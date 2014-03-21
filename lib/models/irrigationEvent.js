'use strict';

var moment = require('moment');

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
        return moment(this.getDataValue('irrigationDate')).toString();
      }
    },
    irrigationVolume: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
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
