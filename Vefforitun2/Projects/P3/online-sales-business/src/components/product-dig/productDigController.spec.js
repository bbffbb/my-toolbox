"use strict";

describe('ProductDigController', () => {
  var controller, scope;

  const mockModalInstance= {
    close: (m) => {
    },
    dismiss: () => {
    }
  };

  beforeEach(module('project3App'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('ProductDigController',{
      $scope: scope,
      $uibModalInstance: mockModalInstance,
      Title: 'title',
      product: {}
    });
    spyOn(mockModalInstance, 'close');
    spyOn(mockModalInstance, 'dismiss');
  }));

  it('should define modalInstance', () => {
    //Assert:
    expect(mockModalInstance).toBeDefined();
  });

  it('should define ok function', () => {
    //Assert:
    expect(scope.ok).toBeDefined();
  });

  it('should define cancel function', () => {
    //Assert:
    expect(scope.cancel).toBeDefined();
  });

  it('should set scope.Title to title', () => {
    //Assert:
    expect(scope.Title).toBe('title');
  });

  it('should set scope.product to {}', () => {
    //Assert:
    expect(scope.product).toEqual({});
  });

  it('should call close when ok is clicked', () => {
    //Act
    scope.ok();
    //Assert:
    expect(mockModalInstance.close).toHaveBeenCalled();
  });

  it('should call dismiss when cancel is clicked', () => {
    //Act
    scope.cancel();
    //Assert:
    expect(mockModalInstance.dismiss).toHaveBeenCalled();
  });
});
