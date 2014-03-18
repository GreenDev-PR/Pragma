'use strict';

module.exports = function(sequelize, DataTypes) {
  var DefaultCropData = sequelize.define('DefaultCropData', {
    cropTypeId: {
      type: DataTypes.INTEGER,
      references: 'CropTypes',
      referencesKey: 'id',
      primaryKey: true
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
        DefaultCropData.belongsTo(models.CropType);
      }
    }
  });

  return DefaultCropData;
};
