"use strict";

describe('SellersController', () => {
  var controller, scope;

  const mockLocation = {
    path: (p) => {
    }
  };

  const mockCentrisNotify = {
    error: (m) => {
    }
  };

  const mockTimeOut = (fn, n) => {
    fn();
  };

  const mockHttpPromise = function(condition, data) {
    return {
      success: function(fn) {
        if (condition) {
          fn(data);
        }
        return {
          error: function (f) {
            if (!condition) {
              f();
            }
          }
        };
      }
    };
  };

  const mockAppResourceSuccess = {
    getSellers: function getSellers() {
      return mockHttpPromise(true, [{},{},{},{},{}]);
    }
  };

  const mockAppResourceError = {
    getSellers: function getSellers() {
      return mockHttpPromise(false);
    }
  };

  beforeEach(module('project3App'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('SellersController',{
      $scope: scope,
      $location: mockLocation
    });
    spyOn(mockLocation, 'path');
  }));

  it('should declare the function sellerPage', () => {
    //Assert:
    expect(scope.sellerPage).toBeDefined();
  });

  it('should call the function path with the parameter "/seller/1"', () => {
    //Act:
    scope.sellerPage(1);
    //Assert:
    expect(mockLocation.path).toHaveBeenCalledWith('/seller/1');
  });

  it('should not call the function path', () => {
    //Act:
    scope.sellerPage();
    //Assert:
    expect(mockLocation.path).not.toHaveBeenCalled();
  });

  describe('mockAppResourceSuccess', () =>{
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      controller = $controller('SellersController',{
        $scope: scope,
        $location: mockLocation,
        AppResource: mockAppResourceSuccess
      });
    }));

    it('AppResource should be defined', () => {
      //Assert:
      expect(mockAppResourceSuccess).toBeDefined();
    });

    //it('AppResource.getSellers() should be called', () => {
    //  spyOn(mockAppResourceSuccess, 'getSellers');
    //  //Assert:
    //  expect(mockAppResourceSuccess.getSellers).toHaveBeenCalled();
    //});

    it('AppResource.getSellers() should update sellers and isLoading variables', () => {
      //Assert:
      expect(scope.sellers.length).toEqual(5);
      expect(scope.isLoading).toBe(false);
    });
  });

  describe('mockAppResourceError', () =>{
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      controller = $controller('SellersController',{
        $scope: scope,
        $location: mockLocation,
        AppResource: mockAppResourceError,
        centrisNotify: mockCentrisNotify,
        $timeout: mockTimeOut
      });
      spyOn(mockCentrisNotify, 'error');
    }));

    //it('should call the function mockCentrisNotify.error()', () => {
    //  //Assert:
    //  expect(mockCentrisNotify.error).toHaveBeenCalled();
    //});

    it('should update isLoading', () => {
      //Assert:
      expect(scope.isLoading).toBe(false);
    });
  });
});
