'use strict';
/**
 * Research Maps Controller.
 *
 * This controller is responsible for defining the default time interval for the maps carousel
 * display, the default startDate and endDate properties of the calendar inputs, and date options
 * properties of the ui-bootstrap calendars. Also, it defines the display date format and the
 * initial state of the carousel. Finally, it provides the generate slide show functionality to
 * the maps view.
 */
angular.module('pragmaApp')
.controller('ResearchMapsCtrl', function ($scope, $filter, variables, DATE_PICKER) {

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

  $scope.datePicker = DATE_PICKER;

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
    var startDateWithoutTimeZone = dateFilter($scope.startDate.value,$scope.datePicker.format);


    /**
     * Define endDateWithoutTimeZone using scope endDate property value with scope format
     * @type {Object}
     */
    var endDateWithoutTimeZone = dateFilter($scope.endDate.value,$scope.datePicker.format);

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

});
