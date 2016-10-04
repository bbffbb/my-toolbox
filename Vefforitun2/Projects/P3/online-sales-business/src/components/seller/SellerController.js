"use strict";

angular.module("project3App").controller("SellerController", ['$scope', '$routeParams', 'AppResource', 'centrisNotify', '$timeout',
function SellersController($scope, $routeParams, AppResource, centrisNotify, $timeout) {
  $scope.sellerId = parseInt($routeParams.sellerId);
  $scope.isLoading = true;

  AppResource.getSellerDetails($scope.sellerId).success((seller) => {
    $scope.seller = seller;
    $scope.isLoading = false;
  }).error(() => {
    $scope.isLoading = false;
    $timeout(function() {centrisNotify.error("seller.Messages.LoadSellerDetailsFailed");}, 1000); // Todo fix centrisNotify
  });

  AppResource.getSellerProducts($scope.sellerId).success((products) => {
    $scope.products = products;
    $scope.isLoading = false;
  }).error(() => {
    $scope.isLoading = false;
    $timeout(function() {centrisNotify.error("seller.Messages.LoadProductsFailed");}, 1000); // Todo fix centrisNotify
  });
}
]);
