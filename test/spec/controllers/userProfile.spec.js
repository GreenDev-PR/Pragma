'use strict';


describe('Controller: UserProfileCtrl', function(){

	var UserProfileCtrl;
	var scope;
	var $q;

	var expectedUser;


	beforeEach(module('pragmaApp'));

	beforeEach(inject(function (_$q_, $controller, $rootScope, Restangular){
		expectedUser = {
			'id': 1,
			'email': 'e1@test.com',
			'name': 'Miguel',
			'organization': 'Organization1',
			'userType': 'farmer',
			'lastName': 'Doe',
			'farmLatitude': 18.229351,
			'farmLongitude': -66.453767,
			'createdAt': '2014-04-04T00:02:34.691Z',
			'updatedAt': '2014-04-04T00:02:34.691Z'
		};

		$q = _$q_;

		scope = $rootScope.$new();

		UserProfileCtrl = $controller('UserProfileCtrl', {
			$scope: scope,
			user: expectedUser
		});

		jasmine.addMatchers({
      toEqualRestangularElement: function(util) {
        return {
          compare: function(actual, expected) {
            actual = Restangular.stripRestangular(actual);
            expected = Restangular.stripRestangular(expected);
            return {
              pass: util.equals(actual, expected)
            };
          }
        };
      }
    });

	}));

	it('tempUser should equal the resolved user', function(){
		expect(scope.tempUser).toEqualRestangularElement(expectedUser);
	});

	describe('Profile Form', function(){

		var form;

		beforeEach(function(){

			form = {};
			form.$valid = false;

			spyOn(scope.tempUser, 'put').and.callFake(function(){
				return $q.when({});
			});

		});

		it('should not have the password populated', function(){
			expect(scope.tempUser.password).not.toBeDefined();
		});

		it('should not be able to submit with invalid form', function(){
			scope.saveChanges(form);
			scope.$digest();
			expect(scope.tempUser.put).not.toHaveBeenCalled();
		});

		it('should be able to submit with valid form', function(){
			form.$valid = true;
			scope.saveChanges(form);
			expect(scope.tempUser.put).toHaveBeenCalled();
			scope.$digest();
		});
	});

});
