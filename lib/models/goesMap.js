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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        GoesMap.belongsTo(models.GoesVariable);
      }
    }
  });

  return GoesMap;
};
