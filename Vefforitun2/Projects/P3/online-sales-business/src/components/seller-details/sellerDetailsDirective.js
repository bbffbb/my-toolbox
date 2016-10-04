"use strict";

angular.module("project3App").directive("sellerDetails",
() => {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
          seller: '='
        },
        templateUrl : 'src/components/seller-details/seller-details.html'
    };
});
