'use strict';

describe('Controller: CropSessionsCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var CropSessionsCtrl, cropSessionsService, scope, q;
  var crops =[{name:'',type:''}];

  beforeEach(inject(function ($controller, $injector, _$q_) {
    scope = $injector.get('$rootScope').$new();

    q = _$q_;

    cropSessionsService = $injector.get('CropSessions');

    spyOn(cropSessionsService,'getAll').and.callFake(function(){
      return q.when(crops);
    });

    CropSessionsCtrl = $controller('CropSessionsCtrl', {
      $scope: scope
    });

    scope.$digest();

  }));


});
