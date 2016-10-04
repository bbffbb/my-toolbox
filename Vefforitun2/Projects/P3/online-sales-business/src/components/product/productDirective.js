"use strict";

angular.module("project3App").directive("product",
() => {
  return {
    restrict: 'E',
    scope: {
      sid: '=',
      product: '='
    },
    templateUrl: 'src/components/product/product.html'
  };
});
