"use strict";

angular.module("project3App").directive("productDig",
['$uibModal', 'AppResource', 'centrisNotify',
  ($uibModal, AppResource, centrisNotify) => {
    return {
      restrict: 'E',
      replace: 'true',
      transclude: 'true',
      scope: {
        product: '=',
        products: '=',
        sid: '='
      },
      templateUrl: 'src/components/product-dig/product-dig-button.html',
      link: ($scope, element, attrs) => {
        $scope.open = () => {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'src/components/product-dig/product-dig.html',
            controller: 'ProductDigController',
            resolve: {
              Title: () => {
                return element[0].textContent;
              },
              product: () => {
                if ($scope.product === undefined) {
                  return {};
                }
                return {
                  id: $scope.product.id,
                  name: $scope.product.name,
                  price: $scope.product.price,
                  quantitySold: $scope.product.quantitySold,
                  quantityInStock: $scope.product.quantityInStock,
                  imagePath: $scope.product.imagePath
                };
              }
            }
          });
          modalInstance.result.then((product) => {
            if (product.id) {//update product
              AppResource.updateSellerProduct($scope.sid, product).success((product) => {
                $scope.product = product;
                centrisNotify.success("productDig.Messages.updateProductSuccess");
              }).error(() => {
                centrisNotify.error("productDig.Messages.updateProductError");
              });
            } else {//new product
              AppResource.addSellerProduct($scope.sid, product).success((product) => {
                if ($scope.products) {//add new product to array
                  $scope.products.push(product);
                }
                centrisNotify.success("productDig.Messages.saveProductSuccess");
              }).error(() => {
                centrisNotify.error("productDig.Messages.saveProductError");
              });
            }
          });
        };
      }
    };
  }
]);
