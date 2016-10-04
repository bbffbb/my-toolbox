"use strict";

describe('SellerController', () => {
  var controller, scope;

  const mockCentrisNotify = {
    error: (m) => {
    }
  };

	const mockRouteParams = {
		sellerId: '1'
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
    getSellerDetails: function getSellerDetails() {
      return mockHttpPromise(true, {});
    },
		getSellerProducts: function getSellerProducts() {
      return mockHttpPromise(true, {});
    }
  };

  const mockAppResourceError = {
		getSellerDetails: function getSellerDetails() {
      return mockHttpPromise(false);
    },
		getSellerProducts: function getSellerProducts() {
      return mockHttpPromise(false);
    }
  };

  beforeEach(module('project3App'));

  describe('mockAppResourceSuccess', () =>{
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      controller = $controller('SellerController',{
        $scope: scope,
				$routeParams: mockRouteParams,
				AppResource: mockAppResourceSuccess
      });
    }));

    it('AppResource should be defined', () => {
      //Assert:
      expect(mockAppResourceSuccess).toBeDefined();
    });

		it('should update isLoading', () => {
      //Assert:
      expect(scope.isLoading).toBe(false);
    });

		it('should update seller', () => {
      //Assert:
      expect(scope.seller).toEqual({});
    });

		it('should update products', () => {
      //Assert:
      expect(scope.products).toEqual({});
    });
  });

  describe('mockAppResourceError', () =>{
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      controller = $controller('SellerController',{
        $scope: scope,
        $routeParams: mockRouteParams,
        AppResource: mockAppResourceError,
        centrisNotify: mockCentrisNotify,
        $timeout: mockTimeOut
      });
    }));

		it('should define centrisNotify', () => {
      //Assert:
      expect(mockCentrisNotify).toBeDefined();
    });

    it('should update isLoading', () => {
      //Assert:
      expect(scope.isLoading).toBe(false);
    });
  });
});
