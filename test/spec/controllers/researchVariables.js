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

});
