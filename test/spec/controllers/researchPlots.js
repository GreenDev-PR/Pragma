'use strict';

describe('Controller: PlotsResearcherCtrl', function(){

	beforeEach(module('pragmaApp'));

	var PlotsResearcherCtrl, scope, $httpBackend;

	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope){

		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
		PlotsResearcherCtrl = $controller('PlotsResearcherCtrl', {
			$scope: scope
		});


	}));

	describe('Google Map', function(){
		
		it('should fail', function(){
			expect(true).toBe(false);
		});

	});

	describe('Map Marker', function(){

	});

	describe('Variable List', function(){

	});

	describe('Start Datepicker', function(){

	});

	describe('End Datepicker', function(){

	});

	describe('Timeseries', function(){

		describe('Changing timeseries data', function(){

		});

	});


});