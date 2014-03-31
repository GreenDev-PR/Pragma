'use strict';

describe('Controller: ResearchvariablesCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var ResearchvariablesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResearchvariablesCtrl = $controller('ResearchvariablesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
