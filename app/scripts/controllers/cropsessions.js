'use strict';
/**
 * Crop Sessions Controller. 
 * Provides appropriate functionalities to the crop sessions view. 
 */
angular.module('pragmaApp')
  .controller('CropSessionsCtrl',['$scope','$injector','CropSessions','CropTypes',
    function ($scope,$injector,CropSessions,CropTypes){
	/**
   * Invoke the Crop session getAll method in order to collect all cropSessions of 
   * the currently logged in user.
   */
  CropSessions.getAll().then(function(cropSessions){
		
    /**
     * Define a scope cropList property with an crop session array containing the user's currently 
     * ongoing crop sesssions.
     * @type {{Object}}
     */
    $scope.cropList = cropSessions;

    /**
     * Modify cropList property to create a JavaScript Date object for the date string representation 
     * property in each crop object in the cropList array.
     * @param  {Object} entry A json object representaion of a single instance of a crop session 
     */
    $scope.cropList.forEach(function(entry){
      entry.startDate = new Date(entry.startDate);
    });

	});

  /**
   * Invoke the Crop Types getAll method inorder to collect all crop types supported by the system 
   */
  CropTypes.getAll().then(function(types){

    /**
     * Define cropTypeList an array containing json object representation of each crop type
     * supported by the system.
     * @type {Object}
     */
    $scope.cropTypeList = types;

  });

  /** 
   * Detete a crop session from the view. 
   * @param  {Integer} index The location of the cropssion inside the crop sessions array.
   */
  $scope.deleteCropSession = function(index){

    /**
     * CropList element at index location
     * @type {Object}
     */
    var temp = $scope.cropList[index];

    CropSessions.remove(temp.id).then(function(){

      /* Remove elment at location index from the scope cropList property array*/
      $scope.cropList.splice(index,1);

    });

  };
  
}]);
