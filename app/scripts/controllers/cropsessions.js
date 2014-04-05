'use strict';

angular.module('pragmaApp')
  .controller('CropSessionsCtrl',['$scope','$injector','CropSessions','CropTypes',
    function ($scope,$injector,CropSessions,CropTypes){
	
  CropSessions.getAll().then(function(cropSessions){
		$scope.cropList = cropSessions;

    //Replace startDate with correct Date format
    $scope.cropList.forEach(function(entry){
      entry.startDate = new Date(entry.startDate);
    });
	});

  CropTypes.getAll().then(function(types){
    $scope.cropTypeList = types;
  });

  $scope.deleteCropSession = function(index){
    var temp = $scope.cropList[index];
    CropSessions.remove(temp.id).then(function(){
      $scope.cropList.splice(index,1);
    });
  };
  
}]);
