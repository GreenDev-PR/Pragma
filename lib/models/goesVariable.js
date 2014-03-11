'use strict';

module.exports = function(sequelize, DataTypes) {

  var GoesVariable = sequelize.define('GoesVariable', {
    variableName: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        GoesVariable.hasMany(models.GoesMap, {onDelete: 'cascade'});
      }
    }
  });

  return GoesVariable;
};
