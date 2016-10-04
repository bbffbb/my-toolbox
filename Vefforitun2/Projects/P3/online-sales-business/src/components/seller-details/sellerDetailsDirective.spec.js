"use strict";

describe('sellerDetailsDirective', () => {
  var template = '<seller-details></seller-details>';
  var scope;
  var compile;
  var element;
  var backend;

  beforeEach(module('project3App'));

  beforeEach(inject(function($rootScope, $compile, $httpBackend) {
    scope = $rootScope.$new();
    compile = $compile;
    backend = $httpBackend;
    $httpBackend.expectGET("lang_is.json").respond('translate');
    $httpBackend.expectGET("src/components/seller-details/seller-details.html").respond('<div></div>');
    element = compile(template)(scope);
    scope.$digest();
    backend.flush();
  }));

  it("should replaces the element with the appropriate content", () => {
    expect(element.html()).toEqual('');
  });
});
