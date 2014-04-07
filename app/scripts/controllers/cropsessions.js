'use strict';
/**
 * Crop Sessions Controller.
 *
 * This controller loads all crop sessions of the user. It is responsible
 * for replacing each of the crop sessions' date property a with JavaScript
 * Date object for ng-filther compatibility. Also, it laods all crop types
 * supported by the system. Finally, it defines the dele Crop Session fucntion,
 * to provide cropSession deletion capabilities.
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

  CropTypes.getAllWithCropData().then(function(cropTypes) {
    $scope.cropTypeList = cropTypes;
  });

  /**
   * Delete a crop session from the view.
   * @param {Integer} index The location of the cropssion inside the crop sessions array.
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

      $scope.$emit('delete:cropSession', index);

    });

  };

}]);
