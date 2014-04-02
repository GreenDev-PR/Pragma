'use strict';

angular.module('pragmaApp')
  .controller('CropSessionsCtrl',['$scope','$injector','CropSessions', function ($scope,$injector,CropSessions) {
	
	CropSessions.getAll().then(function(result){
		$scope.cropList = result;
	});

  $scope.deleteSession = function(index){
    var temp = $scope.cropList[index];
    $scope.cropList.splice(index,1);
    CropSessions.delete(temp.iD);
  };
}]);
