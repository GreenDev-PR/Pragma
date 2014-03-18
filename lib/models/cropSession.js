'use strict';

module.exports = function(sequelize, DataTypes) {
  var CropSession = sequelize.define('CropSession', {
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    },
    cropTypeId: {
      type: DataTypes.INTEGER,
      references: 'CropTypes',
      referencesKey: 'id'
    },
    cropName: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.DATE
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
        CropSession.belongsTo(models.User);
        CropSession.belongsTo(models.CropType);
      }
    }
  });

  return CropSession;
};
