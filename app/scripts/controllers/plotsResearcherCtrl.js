'use strict';

var RESOLUTION = 0.00899281;
var LATITUDE = 17.8;
var LONGITUDE = -67.3;

var getColumn = function(longitude) {
  return Math.round(Math.abs(LONGITUDE-longitude)/RESOLUTION);
};

var getRow = function(latitude) {
  return Math.round(Math.abs(LATITUDE-latitude)/RESOLUTION);
};

angular.module('pragmaApp')
.controller('PlotsResearcherCtrl', ['$scope', 'variables',function ($scope, variables) {
  $scope.map = {
    center:{
      latitude: 18.229351,
      longitude: -66.25
    },
    zoom: 9,
    draggable: false,
    options: {
      disableDefaultUI: true,
      scrollwheel: false
    }
  };

  $scope.marker = {
    coords:{
      latitude: 18.229351,
      longitude: -66.25
    },
    options: {
      draggable: true
    },
    events: {
      dragend: function(evt) {
        $scope.marker.coords.latitude = evt.position.k;
        $scope.marker.coords.longitude = evt.position.A;
        $scope.$digest();
      }
    }
  };

  variables.getAll().then(function(result){
    console.log(result.length);
    $scope.variables = result;
  });

  // [{name:'actual_ET'},
  // {name:'actual_vapor_pressure'},{name:'aerodynamic_resistance'},
  // {name:'aquifer_recharge'},{name:'average_air_temperature'},
  // {name:'Bowen_Ratio'},{name:'crop_coefficient'},{name:'crop_stress_coefficient'},
  // {name:'effective_surface_temperature'},{name:'latent_heat_flux'},
  // {name:'max-min_air_temperature'},{name:'maximum_air_temperature'},
  // {name:'minimum_air_temperature'},{name:'net_radiation'},
  // {name:'rainfall'},{name:'reference_ET'},{name:'relative_humidity'},
  // {name:'runoff'},{name:'saturated_vapor_pressure'},
  // {name:'sensible_heat_flux'},{name:'soil_moisture'},
  // {name:'soil_saturation'},{name:'solar_radiation'},{name:'surface_resistance'},
  // {name:'wind_speed'}];
  

  $scope.startDate = {
    value: new Date(),
    opened: false,
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startDate.opened = true;
    }
  };

  $scope.endDate = {
    value: new Date(),
    opened: false,
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endDate.opened = true;
    }
  };

  $scope.showWeeks = true;

  $scope.dateOptions = {
    'year-format': '\'yy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  };

  $scope.minDate = '2009-01-01';
  $scope.maxDate = '2014-04-27';

  console.log($scope.variable);

  $scope.timeseries = {
    config: {
      chart: {
        zoomType: 'x',
        spacingRight: 20
      },

      legend: {
        enabled: false
      },

      title: {
        text: $scope.variable
      },

      plotOptions: {
        area: {
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
          },
          lineWidth: 1,
          marker: {
            enabled: false
          },
          shadow: false,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        name: 'old data',
        data: [1,2,3,4]
      }]

    }
  };

  console.log('legend '+$scope.timeseries.config.legend.enabled);

  $scope.$watch('variable', function(newValue){
    if(newValue){
      $scope.timeseries.config.title.text = newValue.variableName;
      console.log(newValue.variableName);
      variables.getDataFor(newValue.variableName).then(function(result){

        var currentLongitude = $scope.marker.coords.longitude;
        var column = getColumn(currentLongitude);
        console.log(column);

        var currentLatitude = $scope.marker.coords.latitude;
        var row = getRow(currentLatitude);
        console.log(row);

        var i;
        var newData = [];
        for(i=0; i<result.length; i++){
          //if(column === getColumn(result[i].column) && row === getRow(result[i].row)){
          newData.push(result[i].dataValue);
          //}
        }
        
        console.log(newData);
        $scope.timeseries.config.series = [{
          data: newData
        }];

      });
    }
  });

}]);