'use strict';

module.exports = function(sequelize, DataTypes) {
  var CropSession = sequelize.define('CropSession', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
      primaryKey: true
    },
    cropName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    cropTypeId: {
      type: DataTypes.INTEGER,
      references: 'CropTypes',
      referencesKey: 'id'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    initialStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    developmentStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    midStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    lateStageLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    kcInitial: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    kcMid: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    kcEnd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        CropSession.belongsTo(models.User);
        CropSession.belongsTo(models.CropType);

        CropSession.hasMany(models.IrrigationEvent);
      }
    }
  });

  return CropSession;
};
