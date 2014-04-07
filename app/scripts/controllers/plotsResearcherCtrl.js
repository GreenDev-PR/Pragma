'use strict';

/**
 * Research Plots Controller module
 * Contolls the functionality of the PlotsResearcher view. Includes managing input from the user to specify data
 * dates, variable name and geographic location.
 */

// Getting the module for the application and adding the controller, injects the variables service.
angular.module('pragmaApp')
.controller('PlotsResearcherCtrl', ['$scope','$filter','variables',function ($scope, $filter, variables) {

  // Helper used to limit the coordinates to 8 decimal places
  /**
   * Used to limit the coordinates (lat and lng) to 8 decimal places
   * as presented in the view's input boxes
   * @param  {Number} number number to filter
   * @returns {Number} filtered number
   */
  var filter = function(number){
    return $filter('number')(number, 8);
  };


  // Google map properties
  
  /**
   * Define properties of the google map used to select the location of the data to show
   * @type {Object}
   */
  $scope.map = {
    center:{
      latitude: 18.229351,
      longitude: -66.25
    },
    zoom: 9,
    draggable: true,
    options: {
    }
  };

  // Map marker properties
  
  /**
   * Define properties of the map marker that a user can drag to choose a location
   * @type {Object}
   */
  $scope.marker = {
    coords:{
      latitude: filter(18.2293),
      longitude: filter(-66.2500)
    },
    options: {
      draggable: true
    },
    events: {
      /**
       * Event triggered by the marker when it is dragged
       * @param  {Object} marker marker that was dragged with new coordinates
       */
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
  
  /**
   * Using the injected variables service to get the list of all variables to populate the dropdown
   * @param  {Object} result list of variables returned by the get all function when resolved
   */
  variables.getAll().then(function(result){
    $scope.variables = result;
  });

  // Properties of the start datepicker
  
  /**
   * Define properties of the start datepicker
   * Initially set to today's date
   * @type {Object}
   */
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
  
  /**
   * Define properties of the end datepicker
   * @type {Object}
   */
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
  
  /**
   * Configures both datepickers to show week of the year
   * @type {Boolean}
   */
  $scope.showWeeks = true;
  
  /**
   * Configures year format and day of the week to start (Sunday)
   * for both date pickers
   * @type {Object}
   */
  $scope.dateOptions = {
    'year-format': '\'yy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  };
 
  /**
   * Configures the min date for the start date. For the end date, the min is the currently
   * @type {String}
   */
  $scope.minDate = '2009-01-01';

  /**
   * Configures the max date for both dates to be today
   * @type {Date}
   */
  $scope.maxDate = new Date();


  //Configuring the timeseries (linear graph)
  
  /**
   * Define timeseries (plot) and its configuration
   * @type {Object}
   */
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

      /**
       * Binding the title of the plot to the currently selected variable
       * @type {Object}
       */
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

  //Event triggered when the Get Data button is pressed
  //Gets the data for the new variable and changes the plot title (variable name)
  
  /**
   * Action triggered by pressing the Get Data button which gets the data
   * for the given variable using the variables service
   */
  $scope.plotData = function() {
    if($scope.variable){
      $scope.timeseries.config.title.text = $scope.variable.variableName;


      var startDate = $scope.startDate.value;
      var endDate = $scope.endDate.value;

      //Allows getting data only for start date before end date
      if(startDate <= endDate){
        //Using the variables service to gather the data for the given variable and date range
        variables.getDataFor($scope.variable.variableName, startDate, endDate).then(function(result){

          /**
           * Maps a function to each element of the result returned by the getDataFor method
           * Used to prepare the data set for displaying in the plot
           * @param  {Object} datum function to apply to each datum returned by getDataFor
           * @return {Object|Array.<Number>} array of data values received from the variables.getDataFor call
           */
          var newData = result.map(function(datum) {
            return datum.dataValue;
          });

          //Updating the timeseries with the new data set
          
          /**
           * Updating the data set for the plot with the new data
           * @type {Array} array with a single series displayed by the plot
           */
          $scope.timeseries.config.series = [{
            data: newData
          }];

          //$scope.timeseries.config.xAxis.categories = dateAxis;
        });
      }
    }
  };

}]);
