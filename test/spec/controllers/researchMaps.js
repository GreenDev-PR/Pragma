'use strict';

describe('Controller: ResearchMapsCtrl', function () {

  beforeEach(module('pragmaApp'));

  var variables = [{variableName: 'rainfall', description: 'a desc'}];
  var today = new Date().setHours(0,0,0,0);
  var maps = [{
    variablename: 'rainfall',
    imagepath: 'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140101.jpg',
    datadate: '2014-01-01 00:00:00-04',
    createdat: '2014-04-01 18:30:23-04',
    updatedat:'2014-04-01 18:30:23-04'
  }];

  var ResearchMapsCtrl, q, scope;
  var variableService;
  var DATE_PICKER;

  beforeEach(inject(function ($controller, $injector, _$q_, _DATE_PICKER_) {
    scope = $injector.get('$rootScope').$new();

    q = _$q_;

    DATE_PICKER = _DATE_PICKER_;

    variableService = $injector.get('variables');

    spyOn(variableService,'getAll').and.callFake(function(){
      return q.when(variables);
    });

    spyOn(variableService,'getMapsFor').and.callFake(function(){
      return q.when(maps);
    });

    ResearchMapsCtrl = $controller('ResearchMapsCtrl', {
      $scope: scope
    });

    scope.$digest();

  }));

  describe('initial state', function (){

    it('should have a datePicker property equal to the DATE_PICKER constant', function() {
      expect(scope.datePicker).toBe(DATE_PICKER);
    });

    it('should have a startDate set', function (){
      expect(scope.startDate.value).toBeDefined();
    });

    it('should have a endDate set', function (){
      expect(scope.endDate.value).toBeDefined();
    });

    it('should have an interval set at 3000', function(){
      expect(scope.state.interval).toEqual(3000);
    });

    it('should have startDate set to currentDate', function(){
      var startDateWithoutTime = scope.endDate.value.setHours(0,0,0,0);
      expect(startDateWithoutTime).toEqual(today);
    });

    it('should have endDate set to currentDate', function(){
      var endDateWithoutTime = scope.endDate.value.setHours(0,0,0,0);
      expect(endDateWithoutTime).toEqual(today);
    });

  });

  describe('getVariablesArray', function(){

    var expectedVariables = [{variableName:'rainfall', description:'a desc'}];

    it('should have been called', function() {
      expect(variableService.getAll).toHaveBeenCalled();
    });

    it('should return an array of variables', function(){
      expect(scope.variables).toEqual(expectedVariables);
    });

  });

  describe('selected date values', function(){

    describe('startDate > endDate', function (){

      beforeEach(function(){
        scope.startDate.value = new Date('2014-01-04');
        scope.endDate.value = new Date('2014-01-03');
        scope.variable = {};
        scope.variable.variableName = 'rainfall';

      });

      it('should not call getMapsFor when startDate > endDate', function(){
        expect(variableService.getMapsFor).not.toHaveBeenCalled();
      });

    });

  });

  describe('generateSlideShow', function(){

    beforeEach(function(){
      scope.startDate.value = new Date('2014-01-01');
      scope.endDate.value = new Date('2014-01-03');
      scope.variable = {};
      scope.variable.variableName = 'rainfall';

    });

    it('should return map imagePaths for specified dates', function(){
      scope.generateSlideShow();
      scope.$apply();
      expect(scope.slides).toEqual(maps);
    });
  });
});

