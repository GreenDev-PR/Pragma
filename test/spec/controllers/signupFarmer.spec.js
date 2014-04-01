'use strict';

describe('Controller: SignupFarmerCtrl', function () {

  // load the controller's module
  beforeEach(module('pragmaApp'));

  var SignupFarmerCtrl;
  var scope;
  var Geocoder;
  var User;
  var $q;
  var state;
  var rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    rootScope = $injector.get('$rootScope');
    scope = rootScope.$new();
    SignupFarmerCtrl = $injector.get('$controller')('SignupFarmerCtrl', {
      $scope: scope
    });

    User = $injector.get('User');
    Geocoder = $injector.get('Geocoder');
    $q = $injector.get('$q');
    state = $injector.get('$state');
  }));

  describe('initial state', function() {

    it('should have a user object defined', function() {
      expect(scope.user.userType).toBeDefined();
    });
    describe('google map', function() {
      it('should have a map object defined', function() {
        expect(scope.map).toBeDefined();
      });

      it('should have its center defined', function() {
        expect(scope.map.center).toBeDefined();
      });
    });

    describe('marker', function() {
      it('should have a marker object defined', function() {
        expect(scope.marker).toBeDefined();
      });

      it('should have a dragend event', function() {
        expect(scope.marker.events.dragend).toBeDefined();
      });

      it('should have both latitude and longitude', function() {
        expect(scope.marker.coords.latitude).toEqual(jasmine.any(Number));
        expect(scope.marker.coords.longitude).toEqual(jasmine.any(Number));
      });
    });
  });


  describe('user location', function() {
    var gResult;
    beforeEach(function() {
      gResult = {
        geometry :{
          location: {
            lat: function() {
              return 1;
            },
            lng: function() {
              return 2;
            }
          }
        }
      };
      spyOn(Geocoder, 'geocode').and.callFake(function() {
        return $q.when([gResult]);
      });

      scope.map.control.getGMap = jasmine.createSpy('getGMap').and.callFake(function() {
        return {setCenter: jasmine.createSpy('setCenter')};
      });
    });

    describe('marker location', function() {
      var dragend;
      beforeEach(function() {

        dragend = function() {
          scope.marker.events.dragend({getPosition: function() {
            return gResult.geometry.location;
          }});
        };
      });

      it('should say that the user selected its location', function() {
        dragend();
        expect(scope.selectedItsLocation).toBe(true);
      });

      it('should say that the user selected its location', function() {
        dragend();
        expect(scope.user.farmLatitude).toEqual(gResult.geometry.location.lat());
        expect(scope.user.farmLongitude).toEqual(gResult.geometry.location.lng());
      });
    });

    describe('search address', function() {
      it('should call the geocoder with the address', function() {
        scope.address = 'Baymon, PR';
        scope.searchAddress();
        expect(Geocoder.geocode).toHaveBeenCalledWith({address: scope.address});
      });

      it('should change the marker marker coords', function() {
        scope.searchAddress();
        scope.$digest();
        expect(scope.marker.coords.latitude).toEqual(gResult.geometry.location.lat());
        expect(scope.marker.coords.longitude).toEqual(gResult.geometry.location.lng());
      });

      it('should set the farmer location', function() {
        scope.searchAddress();
        scope.$digest();
        expect(scope.user.farmLatitude).toEqual(gResult.geometry.location.lat());
        expect(scope.user.farmLongitude).toEqual(gResult.geometry.location.lng());
      });

      it('should say that the user selected its location', function() {
        scope.searchAddress();
        scope.$digest();
        expect(scope.selectedItsLocation).toBe(true);
      });
    });
  });

  describe('register', function() {
    var form;
    beforeEach(function() {
      form =  {};
      spyOn(User, 'register').and.callFake(function() {
        return $q.when({name: 'victor', email:'v@v.com'});
      });
    });

    describe('with a invalid form', function() {
      beforeEach(function() {
        form.$valid = false;
      });
      it('should not make the register request', function() {
        scope.register(form);
        scope.$digest();
        expect(User.register).not.toHaveBeenCalled();
      });
    });

    describe('with a valid form', function() {
      beforeEach(function() {
        form.$valid = true;
      });

      it('should not make the request when the form its valid but it has not selected its location', function() {
        scope.register(form);
        expect(User.register).not.toHaveBeenCalled();
      });

      it('should make the request when the form is valid and the user has selected its location', function() {
        scope.selectedItsLocation = true;
        scope.register(form);
        expect(User.register).toHaveBeenCalled();
      });

      it('should change to the login state', function() {
        spyOn(state, 'go').and.callFake(function() {});
        scope.selectedItsLocation = true;
        scope.register(form);
        scope.$digest();
        expect(state.go).toHaveBeenCalledWith('login');
      });

      it('should call register with the correct arguments', function() {
        scope.user.name = 'victor';
        scope.user.lastName = 'reventos';
        scope.user.organization = 'uprm';
        scope.user.email = 'v@v.com';
        scope.user.password = 'pwd';
        scope.user.farmLatitude = 1;
        scope.user.farmLongitude = 2;

        scope.selectedItsLocation = true;
        scope.register(form);
        expect(User.register).toHaveBeenCalledWith(scope.user);
      });
    });
  });
});
