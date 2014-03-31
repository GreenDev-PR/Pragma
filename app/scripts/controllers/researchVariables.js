'use strict';

angular.module('pragmaApp')
  .controller('ResearchVariables', ['$scope','variables', function ($scope, variables) {
	variables.getAll().then(function(result){
		$scope.variables = result;
	});
}]);
