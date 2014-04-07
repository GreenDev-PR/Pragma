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
  .controller('CropSessionsCtrl', function($scope, CropSessions, CropTypes, $modal){
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
  $scope.newCropSession = {};

  $scope.openModal = function () {

    var modalInstance = $modal.open({
      templateUrl: 'partials/addCropSessionModal.html',
      scope: $scope,
      controller: function($scope, $modalInstance) {
        $scope.format = 'yyyy/MM/dd';

        $scope.dateOptions = {
          'date-format': '\'dd-MMMM-yyyy\'',
          'starting-day': 1,
          'datepicker-append-to-body': false,
          'show-button-bar': false
        };

        $scope.maxDate = new Date();
        $scope.startDate = {
          value: new Date(),
          opened: false,
          open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.startDate.opened = true;
          }
        };

        $scope.selectedCropType = $scope.cropTypeList[0];
        $scope.save = function() {
          console.log('the selectedCropType', $scope.selectedCropType);
          angular.extend($scope.newCropSession, $scope.selectedCropType.cropData);
          $scope.newCropSession.startDate = $scope.startDate.value;

          var created = CropSessions.create($scope.newCropSession).then(function(newCropSession) {
            $scope.cropList.push(newCropSession);
            $scope.$emit('add:cropSession', newCropSession);
            $scope.newCropSession = {};
          });

          created.finally(function() {
            $modalInstance.close();
          });
        };

        $scope.cancel = function () {
          $scope.newCropSession = {};
          $modalInstance.dismiss('cancel');
        };
      }
    });

    modalInstance.result.then(function(newCropSession) {
      console.log(newCropSession);
    });
  };
});
