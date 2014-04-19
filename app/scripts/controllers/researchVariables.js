'use strict';
/**
 * Research Variables Controller.
 *
 * Provides appropriate functionalities for the research variables views.
 * This controller loads the all goes-variables supported by the system for
 * research variables view.
 */
angular.module('pragmaApp')
.controller('ResearchVariablesCtrl', function ($scope, resolvedVariables) {

	/**
	 * Define scope variables property with json object array containing all goes varaibles
	 * supported by the system.
	 * @type {Object|Array.<Object>}
	 */
	$scope.variables = resolvedVariables;

});
