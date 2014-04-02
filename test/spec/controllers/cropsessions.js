'use strict';

describe('Controller: CropsessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var CropsessionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CropsessionsCtrl = $controller('CropsessionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
