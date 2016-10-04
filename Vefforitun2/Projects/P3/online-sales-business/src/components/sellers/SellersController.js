"use strict";

angular.module("project3App").controller("SellersController", ['$scope', '$location', 'AppResource', 'centrisNotify', '$timeout',
  function SellersController($scope, $location, AppResource, centrisNotify, $timeout) {
    $scope.isLoading = true;

    AppResource.getSellers().success((sellers) => {
      $scope.sellers = sellers;
      $scope.isLoading = false;
    }).error(() => {
      $scope.isLoading = false;
      $timeout(function() {centrisNotify.error("sellers.Messages.LoadFailed");}, 1000); //Todo fix centrisNotify
    });

    $scope.sellerPage = function sellerPage(id) {
      if(id){
        $location.path('/seller/' + id);
      }
    };
  }
]);
