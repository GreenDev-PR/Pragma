'use strict';

module.exports = function(sequelize, DataTypes) {
  var CropType = sequelize.define('CropType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cropType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        CropType.hasMany(models.DefaultCropData);
        CropType.hasMany(models.CropSession);
      }
    }
  });

  return CropType;
};
