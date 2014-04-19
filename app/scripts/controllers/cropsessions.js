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
  .controller('CropSessionsCtrl', function($scope, CropSessions, cropSessionsData, cropTypes, $modal) {


  /**
   * Define a scope cropSessions property with an crop session array containing the user's currently
   * ongoing crop sesssions.
   * @type {{Object}}
   */
  $scope.data = cropSessionsData;

  $scope.cropTypes = cropTypes;

  /**
   * Delete a crop session from the view.
   * @param {Integer} index The location of the cropssion inside the crop sessions array.
   */
  $scope.deleteCropSession = function(index){

    /**
     * cropSessions element at index location
     * @type {Object}
     */
    var temp = $scope.data.cropSessions[index];

    CropSessions.remove(temp.id);
  };

  $scope.newCropSession = {};

  $scope.openModal = function () {
    var modalInstance = $modal.open({
      templateUrl: 'partials/addCropSessionModal.html',
      scope: $scope,
      controller: function($scope, $modalInstance, DATE_PICKER) {
        $scope.datePicker = DATE_PICKER;

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

        $scope.selectedCropType = $scope.cropTypes[0];
        $scope.save = function() {
          angular.extend($scope.newCropSession, $scope.selectedCropType.cropData);
          $scope.newCropSession.startDate = $scope.startDate.value;

          var createdPromise = CropSessions.create($scope.newCropSession).then(function() {
            $scope.newCropSession = {};
          });

          createdPromise.finally(function() {
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
