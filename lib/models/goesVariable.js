'use strict';

module.exports = function(sequelize, DataTypes) {

  var GoesVariable = sequelize.define('GoesVariable', {
    variableName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        GoesVariable.hasMany(models.GoesMap, {foreignKey: 'variableName'});
        GoesVariable.hasMany(models.GoesData, {foreignKey: 'variableName'});
      }
    }
  });

  return GoesVariable;
};
