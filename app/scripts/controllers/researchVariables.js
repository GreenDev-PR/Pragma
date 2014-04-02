'use strict';

angular.module('pragmaApp')
  .controller('ResearchVariablesCtrl', ['$scope','variables', function ($scope, variables) {
	variables.getAll().then(function(result){
		$scope.variables = result;
	});
}]);
