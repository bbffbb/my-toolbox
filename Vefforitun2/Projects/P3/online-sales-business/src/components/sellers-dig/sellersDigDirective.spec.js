"use strict";
describe("sellersDigDirective", function() {
  var template = "<sellers-dig seller='s'></sellers-dig>";
  var scope;
  var compile;
  var element;
  var backend;

  var modalCtrl, modalScope, modalInstance;

  beforeEach(module("project3App"));
  beforeEach(inject(function($controller, $rootScope, $compile, $httpBackend) {
    scope = $rootScope.$new();
    modalScope = $rootScope.$new();
    modalInstance = {
      // create a mock object using spies
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };
    modalCtrl = $controller('SellersDigController', {
      $scope: modalScope,
      $uibModalInstance: modalInstance,
      Title: 'title',
      seller: {id: 1}
    });
    compile = $compile;
    backend = $httpBackend;
    scope.s = {id: 1};
    $httpBackend.expectGET("lang_is.json").respond("test");
    $httpBackend.expectGET("src/components/sellers-dig/sellers-dig-button.html").respond("<div></div>");
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
