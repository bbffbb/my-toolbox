"use strict";

describe('tooltipDirective', () => {
  var template = '<div tooltip></div>';
  var element, scope;

  beforeEach(module('project3App'));

  beforeEach(inject(($compile, $rootScope, $httpBackend) => {
    $httpBackend.expectGET("lang_is.json").respond("translate");
    scope = $rootScope.$new();
    element = $compile(template)(scope);
    scope.$digest();
    $httpBackend.flush();
  }));

  it("should not be visible", inject(($httpBackend) => {
  }));

  it("should be visible on hover", inject(($httpBackend) => {
  }));

});
