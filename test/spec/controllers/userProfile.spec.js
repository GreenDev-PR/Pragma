'use strict';


describe('Controller: UserProfileCtrl', function(){

	var UserProfileCtrl;
	var scope;
	var $q;
	var User;
	var state;

	var expectedUser = {
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


	beforeEach(module('pragmaApp'));

	beforeEach(inject(function (_$q_, $controller, $rootScope, $injector){

		User = $injector.get('User');

		state = $injector.get('$state');

		User = $injector.get('User');

		$q = _$q_;

		scope = $rootScope.$new();

		console.log('User service', User);

		spyOn(User, 'getMe').and.callFake(function(){
      console.log('inside getMe');
      return $q.when(expectedUser);
    });

		UserProfileCtrl = $controller('UserProfileCtrl', {
			$scope: scope
		});

		scope.$digest();


	}));

	it('user should match the currently logged in user (me)', function(){
		console.log('current user', scope.user);
		console.log('scope.user', scope.user);
		expect(scope.user).toEqual(expectedUser);
	});

	describe('Profile Form', function(){

		var form;

		beforeEach(function(){

			form = {};
			form.$valid = false;

			spyOn(state, 'go').and.callFake(function(){
				console.log('state on change called');
			});

			spyOn(User, 'update').and.callFake(function(){
				console.log('User update called');
				return $q.when({});
			});

		});

		it('should not have the password populated', function(){
			expect(scope.user.password).not.toBeDefined();
		});

		it('should not be able to submit with invalid form', function(){
			scope.saveChanges(form);
			scope.$digest();
			expect(User.update).not.toHaveBeenCalled();
		});

		it('should be able to submit with valid form', function(){
			form.$valid = true;
			scope.saveChanges(form);
			scope.$digest();
			expect(User.update).toHaveBeenCalled();
		});


	});

});
