'use strict';

module.exports = function(sequelize, DataTypes) {
  var GoesMap = sequelize.define('GoesMap', {
    variableName: {
      type: DataTypes.STRING,
      references: 'GoesVariables',
      referencesKey: 'variableName',
      primaryKey: true
    },
    imagePath: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    dataDate: {
      type: DataTypes.DATE,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      primaryKey: true
    },
  }, {
    classMethods: {
      associate: function(models) {
        GoesMap.belongsTo(models.GoesVariable);
      },
      getLatest: function(variableName) {
        return GoesMap.find({
          where: {
            variableName: variableName
          },
          order: '"dataDate" desc'
        });
      }
    }
  });

  return GoesMap;
};
