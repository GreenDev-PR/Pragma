'use strict';
/**
 * Research Variables Controller. 
 * Provides appropriate functionalities for the research variables views.
 */
angular.module('pragmaApp')
.controller('ResearchVariablesCtrl', ['$scope','variables', function ($scope, variables) {
	
	/**
	 * Invoke the variablesService getAll method to collect an json array representation of
	 * the supported goes-variables
	 */
	variables.getAll().then(function(result){

		/**
		 * Define scope variables property with json object array containing all goes varaibles
		 * supported by the system.
		 * @type {Object|Array.<Object>}
		 */
		$scope.variables = result;
	});

}]);
