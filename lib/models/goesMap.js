'use strict';

var moment = require('moment');

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
      primaryKey: true,
      get: function() {
        return moment(this.getDataValue('dataDate')).toISOString();
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      primaryKey: true
    },
  }, {
    classMethods: {
      associate: function(models) {
        GoesMap.belongsTo(models.GoesVariable, {foreignKey: 'variableName'});
      },
      getLatest: function(variableName) {
        return GoesMap.find({
          where: {
            variableName: variableName
          },
          order: 'dataDate desc'
        });
      },
      getMapsBetween: function(variableName,startDate, endDate) {
        return GoesMap.findAll({
          where: {
            variableName: variableName,
            dataDate: {
              between: [startDate, endDate]
            }
          }
        });
      }
    }
  });

  return GoesMap;
};
