"use strict";
describe("productDigDirective", function() {
  var template = "<product-dig product='p' products='ps' sid='id'></product-dig>";
  var scope;
  var compile;
  var element;
  var backend;

  var modalCtrl, modalScope, modalInstance;

  var mockUibModal = {
    open: function() {
      return {
        result: {}
      };
    }
  };

  beforeEach(module("project3App"));
  beforeEach(inject(function($controller, $rootScope, $compile, $httpBackend, $uibModal) {
    scope = $rootScope.$new();
    $uibModal = mockUibModal;
    modalScope = $rootScope.$new();
    modalInstance = {
      // create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    modalCtrl = $controller('ProductDigController', {
      $scope: modalScope,
      $uibModalInstance: modalInstance,
      Title: 'title',
      product: {id: 1}
    });
    compile = $compile;
    backend = $httpBackend;
    scope.p = {id: 1};
    scope.ps = [{},{}];
    scope.id = 1;
    $httpBackend.expectGET("lang_is.json").respond("test");
    $httpBackend.expectGET("src/components/product-dig/product-dig-button.html").respond("<div></div>");
  }));

  it('should instantiate the mock controller', function () {
    expect(modalCtrl).not.toBeUndefined();
  });

  it('should call the modal close function', function () {
    modalScope.ok();
    expect(modalInstance.close).toHaveBeenCalled();

  });

  it("should define open", function() {
    element = compile(template)(scope);
    backend.flush();
    var isolatedScope = element.isolateScope();
    expect(isolatedScope.open).toBeDefined();
  });

  describe("open", function() {
    it("should create modal", function() {
      element = compile(template)(scope);
      backend.flush();
      var isolatedScope = element.isolateScope();
      isolatedScope.open();
    });

    it("should create modal with product as undefined", function() {
      element = compile(template)(scope);
      backend.flush();
      var isolatedScope = element.isolateScope();
      isolatedScope.product = undefined;
      isolatedScope.open();
    });
  });
});
