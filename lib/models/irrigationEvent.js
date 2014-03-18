'use strict';

module.exports = function(sequelize, DataTypes) {
  var IrrigationEvent = sequelize.define('IrrigationEvent', {
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    },
    cropSessionId: {
      type: DataTypes.INTEGER,
      references: 'CropSessions',
      referencesKey: 'id'
    },
    irrigationDate: {
      type: DataTypes.DATE,
      allowNull: false
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
        IrrigationEvent.belongsTo(models.User);
        IrrigationEvent.belongsTo(models.CropSession);
      }
    }
  });

  return IrrigationEvent;
};
