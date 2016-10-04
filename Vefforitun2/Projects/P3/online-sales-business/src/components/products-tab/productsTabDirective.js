"use strict";

angular.module("project3App").directive("productsTab",
function() {
  return {
    restrict: 'E',
    scope: {
      sid: '=',
      products: '='
    },
    templateUrl: 'src/components/products-tab/products-tab.html'
  };
});
