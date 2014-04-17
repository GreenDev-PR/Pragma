'use strict';

describe('Controller: PlotsResearcherCtrl', function(){

	beforeEach(module('pragmaApp'));

	var PlotsResearcherCtrl;
	var variables;
	var scope;
	var $q;
	var DATE_PICKER;

	var variableNames = ['rainfall', 'actual_ET'];
	var variableData = [{dataDate: new Date(), dataValue: 1}, {dataDate: new Date(), dataValue: 2}];
	var today = new Date().setHours(0,0,0,0);


	beforeEach(inject(function (_$q_, $controller, $rootScope, $injector, _DATE_PICKER_){

		variables = $injector.get('variables');

		$q = _$q_;

		DATE_PICKER = _DATE_PICKER_;

		spyOn(variables, 'getAll').and.callFake(function(){
			return $q.when(variableNames);
		});

		spyOn(variables, 'getDataFor').and.callFake(function(){
			return $q.when(variableData);
		});

		scope = $rootScope.$new();

		PlotsResearcherCtrl = $controller('PlotsResearcherCtrl', {
			$scope: scope
		});

		scope.$digest();

	}));

	describe('Google Map', function(){
		it('should initially be in latitude', function(){
			expect(scope.map.center.latitude).toBeCloseTo(18.229351, 4);
		});

		it('should initially be in longitude', function(){
			expect(scope.map.center.longitude).toBeCloseTo(-66.2500, 4);
		});

		it('should initially be in longitude', function(){
			expect(scope.map.zoom).toBe(9);
		});
	});

	describe('Map Marker', function(){
		it('should be placed in latitude', function(){
			expect(scope.marker.coords.latitude).toBeCloseTo(18.2293, 4);
		});

		it('should be placed in longitude', function(){
			expect(scope.marker.coords.longitude).toBeCloseTo(-66.2500, 4);
		});

		it('should be draggable', function(){
			expect(scope.marker.options.draggable).toBe(true);
		});

		it('should handle drag event', function(){
			expect(scope.marker.events.dragend).toBeDefined();
		});
	});

	describe('Variable List', function(){
		it('should call getAll on the variables service', function(){
			expect(variables.getAll).toHaveBeenCalled();
		});
		it('should return the list of GOES-PRWEB variables', function(){
			expect(scope.variables).toEqual(variableNames);
		});
	});

	describe('Dates', function() {

		it('should have a datePicker property equal to the DATE_PICKER constant', function() {
      expect(scope.datePicker).toBe(DATE_PICKER);
    });

		it('should have a maximum date of today', function(){
				var actualDate = scope.maxDate.setHours(0,0,0,0);
				expect(actualDate).toEqual(today);
			});

		describe('Start Date', function(){
			it('should have an initial date of today', function(){
				var actualDate = scope.startDate.value.setHours(0,0,0,0);
				expect(actualDate).toEqual(today);
			});
		});

		describe('End Date', function(){
			it('should have an initial date of today', function(){
				var actualDate = scope.endDate.value.setHours(0,0,0,0);
				expect(actualDate).toEqual(today);
			});
		});

	});

	describe('Timeseries', function(){

		it('should be defined and configured', function(){
			expect(scope.timeseriesConfig).toBeDefined();
		});

		describe('Changing timeseries data using getData', function(){

			it('should have called getDataFor', function(){
				scope.variable = {};
				scope.variable.variableName = 'rainfall';
				scope.plotData();
				scope.$apply(); //trigger button click
				expect(variables.getDataFor).toHaveBeenCalled();
			});

			it('getDataFor should not be called with a start date after the end date', function(){
				scope.startDate.value = new Date('March 3, 2014 00:00:00');
				scope.endDate.value = new Date('March 1, 2014 00:00:00');
				scope.variable = {};
				scope.variable.variableName = 'rainfall';
				scope.plotData();
				scope.$apply(); //trigger button click
				expect(variables.getDataFor).not.toHaveBeenCalled();
			});

			describe('getting data for the given variable', function(){

				var expectedVariableData = variableData.map(function(datum) {
          return [new Date(datum.dataValue), datum.dataValue];
        });

        expectedVariableData = [{data: expectedVariableData}];

				beforeEach(function(){
					scope.startDate.value = new Date('March 1, 2014 00:00:00');
					scope.endDate.value = new Date('March 3, 2014 00:00:00');
					scope.variable = {};
					scope.variable.variableName = 'rainfall';
					scope.timeseriesConfig.series = {};
				});

				it('should get the data for the variable', function(){
					scope.plotData();
					scope.$apply(); //trigger button click
					expect(scope.timeseriesConfig.series).toEqual(expectedVariableData);
				});

			});

		});

	});

});
