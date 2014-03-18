'use strict';

// TODO verify foreign key constraint
module.exports = function(sequelize, DataTypes) {
  var IrrigationEvent = sequelize.define('IrrigationEvent', {
    cropSessionId: {
      type: DataTypes.INTEGER
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
        IrrigationEvent.belongsTo(models.CropSession, {foreignKeyConstraint: true});
      }
    }
  });

  return IrrigationEvent;
};
