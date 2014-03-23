'use strict';

var locationMapper = require('../helpers/locationMapper');

module.exports = function(sequelize, DataTypes) {
  var GoesData =  sequelize.define('GoesData', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    variableName: {
      type: DataTypes.STRING,
      references: 'GoesVariables',
      referencesKey: 'variableName',
    },
    matrixRow: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    matrixColumn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dataValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dataDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    createdAt: false,
    getterMethods: {
      latitude: function() {
        return locationMapper.getLatitude(this.getDataValue('matrixRow'));
      },
      longitude: function() {
        return locationMapper.getLongitude(this.getDataValue('matrixColumn'));
      }
    },
    classMethods: {
      associate: function(models) {
        GoesData.belongsTo(models.GoesVariable, {foreignKey: 'variableName'});
      },
      getValuesFor: function(variableName, dataDate) {
        var sql = 'SELECT a.* FROM GoesData AS a ' +
        'INNER JOIN ( ' +
        'SELECT id, max(createdAt) AS latest '+
        'FROM GoesData ' +
        'WHERE variableName=:variableName AND ' +
        'date_trunc(\'day\', dataDate) = date_trunc(\'day\', TIMESTAMP :dataDate) ' +
        'GROUP BY id) AS d ' +
        'ON a.id = d.id ' +
        'ORDER BY id';

        return sequelize.query(sql, GoesData, null, {variableName: variableName, dataDate: dataDate});
      },

      getLatestValuesFor: function(variableName) {
        var sql ='SELECT * FROM goesdata ' +
        'WHERE ( ' +
        'SELECT max(createdAt) FROM goesData ' +
        'WHERE ' +
        'dataDate = (SELECT max(dataDate) FROM goesData WHERE variableName= :variableName) ' +
        'AND variableName=  :variableName ' +
        ') = createdAt ' +
        'AND variableName =  :variableName ' +
        'AND dataDate = (SELECT max(dataDate) FROM goesData WHERE variableName= :variableName)';

        return sequelize.query(sql, GoesData, null, {variableName: variableName});
      }
    }
  });

  return GoesData;
};
