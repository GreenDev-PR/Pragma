'use strict';

describe('Controller: ResearchMapsCtrl', function () {

  beforeEach(module('pragmaApp'));

  var variables = [{variableName: 'rainfall', description: 'a desc'}];

  var maps = [{variablename: 'rainfall',
  imagepath: 'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140101.jpg',
  datadate: '2014-01-01 00:00:00-04', createdat: '2014-04-01 18:30:23-04', updatedat:'2014-04-01 18:30:23-04'}];

  var ResearchMapsCtrl, q, scope;
  var variableService;

  beforeEach(inject(function ($controller, $injector, _$q_) {
    scope = $injector.get('$rootScope').$new();
    q = _$q_;

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

    beforeEach(function(){

    });

    it('should have a minDate set', function (){
      expect(scope.minDate).toBeDefined();
    });

    it('should have a scopeFormat set', function (){
      expect(scope.format).toBeDefined();
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

    it('should have date options set', function(){
      expect(scope.dateOptions).toBeDefined();
    });

    it('should have startDate set to currentDate', function(){
      expect(scope.startDate.value).toEqual(new Date());
    });

    it('should have endDate set to currentDate', function(){
      expect(scope.endDate.value).toEqual(new Date());
    });

  });

  describe('getVariablesArray', function(){
    
    var expectedVariables = [{variableName:'rainfall', description:'a desc'}];

    beforeEach(function(){

    });

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
        console.log(scope.startDate.value);
        scope.endDate.value = new Date('2014-01-03');
        console.log(scope.endDate.value);
        console.log(scope.variable);
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
      console.log(scope.startDate.value);
      console.log(scope.endDate.value);
      console.log(scope.variable.variableName);
    });

    it('should return map imagePaths for specified dates', function(){
      scope.generateSlideShow();
      scope.$apply();
      console.log(scope.slides);
      expect(scope.slides).toEqual(maps);
    });

  });


});

