'use strict';

describe('Controller: ResearchVariablesCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var ResearchVariablesCtrl, scope, q, variableService;
  var variables;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$q_, $injector){
    variables = [{variableName: 'rainfall', description: 'a desc'}];

    scope = $injector.get('$rootScope').$new();

    q = _$q_;

    variableService = $injector.get('variables');

    ResearchVariablesCtrl = $controller('ResearchVariablesCtrl', {
      $scope: scope,
      resolvedVariables: variables
    });

    scope.$digest();
  }));

  describe('initial state', function(){

    it('should have a variables property equal to the resolvedVariables', function(){
      expect(scope.variables).toEqual(variables);
    });

  });
});
