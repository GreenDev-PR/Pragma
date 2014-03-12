'use strict';

var factory = require('rosie').Factory;
var Faker = require('Faker');
var i = 0;

factory.define('GoesVariable')
.attr('variableName', function() {
  return Faker.definition.first_name[i++];
})
.attr('description', function() {
  return Faker.definition.last_name[i++];
});

exports.goesVariables = [
  {'variableName':'actual_ET','description':'Actual evapotranspiration (mm/day) is the \'real\' evapotransporation occuring under well-watered or water deficit conditions. A description for the estmation of actual ET is presented by Harmsen et al. (2010)'},
  {'variableName':'actual_vapor_pressure','description':'Actual vapor pressure (kPa) is the vapor pressure defict cacluated at the dew point temperature'},
  {'variableName':'aerodynamic_resistance','description':'Aerodynamic resistance (s/m) is the effective resistance to vapor and heat flux from the crop canopy owing to the wind speed, shape, height and roughness of the crop. '},
  {'variableName':'aquifer_recharge','description':'Aquifer recharge (mm/day) is the amount of  water that percolates beyond the root zone and enters the underlying groundwater system.'},
  {'variableName':'average_air_temperature','description':'Average air temperature (C), estimated using the lapse rate method of Goyal et al. (1989). Daily average air temperatures estimates are improved by nudging with temperature data from the National Weather Service\'s National Digital Forecast Database.   '},
  {'variableName':'Bowen_Ratio','description':'The Bowen Ratio is defined as the ratio of the sensible heat flux to the latent heat flux. '},
  {'variableName':'crop_coefficient','description':'The crop coefficient is defined as the ratio of the actual evapotranspiration to the reference evapotranspiration.'},
  {'variableName':'crop_stress_coefficient','description':'Water stress coefficient'},
  {'variableName':'effective_surface_temperature','description':'Effective surface temperature (C), approximately equal to the vegetation temperature.'},
  {'variableName':'latent_heat_flux','description':'Heat released when liquid water is converted to water vapor.'},
  {'variableName':'max-min_air_temperature','description':'Maximum air temperature minus the minimum air temperature (C).'},
  {'variableName':'maximum_air_temperature','description':'Maximum air temperature (C).'},
  {'variableName':'minimum_air_temperature','description':'Minimum air temperature (C).'},
  {'variableName':'net_radiation','description':'Daily net radiation (MJ/m2day).'},
  {'variableName':'rainfall','description':'Daily Rainfall (mm/day).'},
  {'variableName':'reference_ET','description':'Daily reference evapotranspiration (mm/day).'},
  {'variableName':'relative_humidity','description':'Average daily relative humidity (%).'},
  {'variableName':'runoff','description':'Daily surface runoff (mm/day).'},
  {'variableName':'saturated_vapor_pressure','description':'Vapor pressure (kPa) calculated at the average daily air temperature.'},
  {'variableName':'sensible_heat_flux','description':'Heat transferred to or from the surface by means of a temperature differences (MJ/m2day).  '},
  {'variableName':'soil_moisture','description':'volumetric soil moisture conent.'},
  {'variableName':'soil_saturation','description':'Soil saturation, and indicator of soil wetness, which varies between 0 and 1.'},
  {'variableName':'solar_radiation','description':'Solar radiation (MJ/m2day) derived from GOES satellite data.'},
  {'variableName':'surface_resistance','description':'Bulk surface resistance (s/m) is the resistance to the vapor flux from the crop canopy and is influenced by net radiation, soil heat flux and soil moisture. In this study, aerodynamic resistance is estimated using the equation of Ortega-Farías and Fuentes (1998).'},
  {'variableName':'wind_speed','description':'Daily average wind speed (m/s) derived from eight values of 3-hr wind speeds obtained from the National Weather Service\'s National Digital Forecast Database.  '}
];
