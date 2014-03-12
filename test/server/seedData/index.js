'use strict';

var fs = require('fs');
var factory = require('rosie').Factory;
var _ = require('lodash');

// load all the factories
fs.readdirSync(__dirname).forEach(function(file) {
  console.log(file);
  if(file !== 'index.js') {
    require('./' + file);
  }
});

exports.data = {
  users: (function() {
    var users =  [];
    for(var i= 0; i < 10; i++) {
      users.push(factory.build('user'));
    }

    return users;
  }()),
  getUser: function(index) {
    var user = _.cloneDeep(this.users[index]);
    delete user.password;
    return user;
  },
  goesVariables: (function() {
    var variableNames = [
      'rainfall','runoff','aquifer_recharge',
      'soil_moisture','actual_ET','reference_ET',
      'crop_coefficient','crop_stress_coefficient',
      'wind_speed','solar_radiation','net_radiation',
      'average_air_temperature','minimum_air_temperature','maximum_air_temperature',
      'effective_surface_temperature','saturated_vapor_pressure','actual_vapor_pressure',
      'relative_humidity','surface_resistance','aerodynamic_resistance',
      'latent_heat_flux','sensible_heat_flux','non_transient_variables',
      'soil_saturation','bowen_ratio'
    ];

    return variableNames.map(function(variableName) {
      return {variableName: variableName};
    });
  })()
};

exports.factory = factory;
