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
      type: DataTypes.FLOAT
    },
    developmentStageLength: {
      type: DataTypes.FLOAT
    },
    midStageLength: {
      type: DataTypes.FLOAT
    },
    lateStageLength: {
      type: DataTypes.FLOAT
    },
    kcInitial: {
      type: DataTypes.FLOAT
    },
    kcMid: {
      type: DataTypes.FLOAT
    },
    kcEnd: {
      type: DataTypes.FLOAT
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
