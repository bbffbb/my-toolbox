"use strict";

angular.module("project3App").directive("sellersDig", ['$uibModal', 'AppResource', 'centrisNotify',
  function($uibModal, AppResource, centrisNotify) {
    return {
      restrict: 'E',
      replace: 'true',
      transclude: 'true',
      templateUrl: 'src/components/sellers-dig/sellers-dig-button.html',
      scope: {
        seller: '='
      },
      link: function($scope, element, attrs) {
        $scope.open = function() {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'src/components/sellers-dig/sellers-dig.html',
            controller: 'SellersDigController',
            resolve: {
              Title: () => {
                return element[0].textContent;
              },
              seller: function() {
                if($scope.seller === undefined){
                  return {};
                }
                else {
                  return {
                    id: $scope.seller.id,
                    name: $scope.seller.name,
                    category: $scope.seller.category,
                    imagePath: $scope.seller.imagePath
                  };
                }

              }
            }
          });
          modalInstance.result.then(function(s) {
            if(s.id) { // Update seller
              AppResource.updateSeller(s.id, s).success((s) => {
                $scope.seller = s;
                centrisNotify.success("sellersDig.Messages.UpdateSucceeded");
              }).error(() => {
                centrisNotify.error("sellersDig.Messages.UpdateFailed");
              });
            } else { // Add seller
              AppResource.addSeller(s).success((s) => {
                centrisNotify.success("sellersDig.Messages.SaveSucceeded");
              }).error(() => {
                centrisNotify.error("sellersDig.Messages.SaveFailed");
              });
            }
          });
        };
      },
    };
  }
]);
