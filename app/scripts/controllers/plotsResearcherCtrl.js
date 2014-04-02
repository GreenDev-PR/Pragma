'use strict';

// var RESOLUTION = 0.00899281;
// var LATITUDE = 17.8;
// var LONGITUDE = -67.3;

// var getColumn = function(longitude) {
//   return Math.round(Math.abs(LONGITUDE-longitude)/RESOLUTION);
// };

// var getRow = function(latitude) {
//   return Math.round(Math.abs(LATITUDE-latitude)/RESOLUTION);
// };

// Getting the module for the application and adding the controller, injects the variables service.
angular.module('pragmaApp')
.controller('PlotsResearcherCtrl', ['$scope','$filter','variables',function ($scope, $filter, variables) {

  // Helper used to limit the coordinates to 8 decimal places
  var filter = function(number){
    return $filter('number')(number, 8);
  };

  // Google map properties
  $scope.map = {
    center:{
      latitude: 18.229351,
      longitude: -66.25
    },
    zoom: 9,
    draggable: false,
    options: {
      disableDefaultUI: false,
      scrollwheel: false
    }
  };

  // Map marker properties
  $scope.marker = {
    coords:{
      latitude: filter(18.2293),
      longitude: filter(-66.2500)
    },
    options: {
      draggable: true
    },
    events: {
      dragend: function(marker) {
        // Binding the coordinates of the input boxes with the marker
        var position = marker.getPosition();
        $scope.marker.coords.latitude = filter(position.lat());
        $scope.marker.coords.longitude = filter(position.lng());
        $scope.$digest();
      }
    }
  };

  // Using the variables service to get a list of all variables
  variables.getAll().then(function(result){
    $scope.variables = result;
  });

  // Properties of the start datepicker
  $scope.startDate = {
    value: new Date(),
    opened: false,
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startDate.opened = true;
    }
  };

  //Properties of the end datepicker
  $scope.endDate = {
    value: new Date(),
    opened: false,
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endDate.opened = true;
    }
  };

  //Additional properties used for both, start and end, datepickers
  $scope.showWeeks = true;
  $scope.dateOptions = {
    'year-format': '\'yy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  };
  $scope.minDate = '2009-01-01';
  $scope.maxDate = new Date();


  //Configuring the timeseries (linear graph)
  $scope.timeseries = {
    config: {
      chart: {
        zoomType: 'x',
        spacingRight: 20
      },

      //TODO: Legend should not be showing
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
      }

    }
  };

  //Event triggered when the selected variable changes
  //Gets the data for the new variable and changes the plot title (variable name)
  $scope.$watch('variable', function(newValue){
    if(newValue){
      $scope.timeseries.config.title.text = newValue.variableName;

      var startDate = $scope.startDate.value;
      var endDate = $scope.endDate.value;

      if(startDate <= endDate){
        //Using the variables service to gather the data for the given variable and date range
        variables.getDataFor(newValue.variableName, startDate, endDate).then(function(result){

          var newData = result.map(function(datum) {
            return datum.dataValue;
          });

          //Updating the timeseries with the new data set
          $scope.timeseries.config.series = [{
            data: newData
          }];

          //$scope.timeseries.config.xAxis.categories = dateAxis;
        });
      }
    }
  });

}]);
