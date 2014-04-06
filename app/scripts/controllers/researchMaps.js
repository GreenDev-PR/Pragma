'use strict';
/**
 * Research Maps Croller module. 
 * It is responsible for providing ResearchMaps view with appropriate functionalities.
 */
angular.module('pragmaApp')
.controller('ResearchMapsCtrl', ['$scope', '$filter','variables', function ($scope, $filter, variables) {

  /**
   * Define the default time interval for carousel slide show movement.
   * @type {Number}
   * @const {Number}
   */
  var DEFAULT_INTERVAL = 3000;

  /**
   * Inject the date filter for date formatting.
   * @type {Object}
   */
  var dateFilter = $filter('date');

  /**
   * Define startDate scope property to the start date's initial value to the current date.  
   * @type {Object} 
   */
  $scope.startDate = {
      value: new Date(),
      opened: false,
      /**
       * This method propagates an open event notifying the calendar has been clicked.
       * @param  {$event} $event  Notification of a calendar open event
       */
      open: function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDate.opened = true;
      }
    };

  /**
   * Define endDate property to the end date's initial value to the current date.
   * @type {Object}
   */
  $scope.endDate = {
    value: new Date(),
    opened: false,
    /**
     * This method propagates an open event notifying the calendar has been clicked.
     * @param  {$event} $event  Notification of a calendar open event.
     */
    open: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.endDate.opened = true;
    }
  };

  /**
   * Defines the showWeeks scope property with an initial value of false.
   * @type {Boolean}
   */
  $scope.showWeeks = false;

  /**
   * Creates a dateOptions object that provides options for the ui-boostrap calendar 
   * @type {Object} 
   */
  $scope.dateOptions = {
    'date-format': '\'dd-MMMM-yyyy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  };

  /** 
   * The earliest date supported by the program. You cannot run the program for a date
   * earlier than this.
   * @type {String}
   */
  $scope.minDate = '2009-01-01';

  /**
   * The string formatting representation of the dates.
   * @type {String} 
   */
  $scope.format = 'yyyy-MM-dd';

  /* Invokes the variablesService getAll method. */
  variables.getAll().then(function(result){
    $scope.variables = result;
  });

  /**
   * Defines the scope state propery with a json object containing the initial state of 
   * the map carousel slide show. 
   * @type {Object}
   */
  $scope.state = {
    interval: DEFAULT_INTERVAL
  };

  /**
   * Generates the maps slide show carousel content. It defines the scope slides property 
   * with an array of map image paths.
   */
  $scope.generateSlideShow = function () {

    /**
     * Define startDateWithoutTimeZone using scope startDate property value with scope format  
     * @type {Object}
     */
    var startDateWithoutTimeZone = dateFilter($scope.startDate.value,$scope.format);
    

    /**
     * Define endDateWithoutTimeZone using scope endDate property value with scope format  
     * @type {Object}
     */
    var endDateWithoutTimeZone = dateFilter($scope.endDate.value,$scope.format);
    
    if(new Date(endDateWithoutTimeZone) >= new Date(startDateWithoutTimeZone)){

      /**
       * Invokes the variablesService getMapsFor method to populate $scope.slides array
       * with map images paths. 
       */
      variables.getMapsFor($scope.variable.variableName, startDateWithoutTimeZone, endDateWithoutTimeZone)
      .then(function (result){
        $scope.slides = result;
      });
    }
  };

}]);
