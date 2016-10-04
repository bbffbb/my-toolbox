"use strict";

describe('navigationBarDirective', () => {
  var template = '<navigation-bar></navigation-bar>';
  var element, scope;

  beforeEach(module('project3App'));

  beforeEach(inject(($compile, $rootScope, $httpBackend) => {
    $httpBackend.expectGET("lang_is.json").respond("translate");
    $httpBackend.expectGET("src/components/navigation-bar/navigation-bar.html").respond("<div></div>");
    $httpBackend.expectGET("components/sellers/index.html").respond("<div></div>");
    scope = $rootScope.$new();
    element = $compile(template)(scope);
    scope.$digest();
    $httpBackend.flush();
  }));

  it("should define change", inject(($httpBackend) => {
    expect(scope.change).toBeDefined();
  }));

  it("should define isFrontPage", inject(($httpBackend) => {
    expect(scope.change).toBeDefined();
  }));

  describe('change()', () => {
    it("should change the language is to en", inject(($httpBackend) => {
      expect(scope.lang).toBe('is');
      scope.change();
      expect(scope.lang).toBe('en');
		}));

    it("should change the language en to is", inject(($httpBackend) => {
      scope.lang = 'en';
      scope.change();
      expect(scope.lang).toBe('is');
		}));
  });
  describe('isFrontPage()', () => {
    it("should return true if client is on front page", inject(($httpBackend) => {
      expect(scope.isFrontPage()).toBe(true);
		}));

    it("should return false if client is not on front page", inject(($location, $rootScope, $httpBackend) => {
      $httpBackend.expectGET("components/seller/index.html").respond("<div></div>");
      $location.path('/seller/1');
      $rootScope.$digest();
      expect(scope.isFrontPage()).toBeFalsy();
		}));

    it("should return false if route.current is false", inject(($route, $httpBackend) => {
      $route.current = false;
      expect(scope.isFrontPage()).toBeFalsy();
		}));
  });
});
