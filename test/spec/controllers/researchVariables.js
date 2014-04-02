'use strict';

describe('Controller: ResearchVariablesCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var ResearchVariablesCtrl, scope, q, variableService;
  var variables = [{variableName: 'rainfall', description: 'a desc'}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$q_, $injector){
    scope = $injector.get('$rootScope').$new();

    q = _$q_;

    variableService = $injector.get('variables');

    spyOn(variableService,'getAll').and.callFake(function(){
      return q.when(variables);
    });

    ResearchVariablesCtrl = $controller('ResearchVariablesCtrl', {
      $scope: scope
    });

    scope.$digest();
  }));

  describe('getVariablesList', function(){
    
    var expectedVariables = [{variableName:'rainfall', description:'a desc'}];
    
    it('should have been called', function() {
      expect(variableService.getAll).toHaveBeenCalled();
    });

    it('should return an array of variables', function(){
      expect(scope.variables).toEqual(expectedVariables);
    });

  });



});
