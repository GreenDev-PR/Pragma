'use strict';

describe('Controller: CropsessionCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var CropsessionCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/awesomeThings')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    scope = $rootScope.$new();
    CropsessionCtrl = $controller('CropsessionCtrl', {
      $scope: scope
    });
  }));

});
