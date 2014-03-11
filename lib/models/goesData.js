'use strict';

module.exports = function(sequelize, DataTypes) {
  var GoesData =  sequelize.define('GoesData', {
    variableName: {
      type: DataTypes.STRING,
      references: 'GoesVariables',
      referencesKey: 'variableName',
      primaryKey: true
    },
    matrixRow: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    matrixColumn: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    dataValue: {
      type: 'REAL',
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.Now,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        GoesData.belongsTo(models.GoesVariable);
      }
    }
  });

  return GoesData;
};
