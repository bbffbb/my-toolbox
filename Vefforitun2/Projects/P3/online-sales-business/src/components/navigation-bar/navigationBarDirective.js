"use strict";

angular.module("project3App").directive("navigationBar",
['$translate', '$route',
function($translate, $route) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'src/components/navigation-bar/navigation-bar.html',
        link: ($scope, element, attrs) => {
          $scope.lang = 'is';
          $scope.change = () =>{
            if($scope.lang === "is"){
              $translate.use('en');
              $scope.lang = 'en';
            } else {
              $translate.use('is');
              $scope.lang = 'is';
            }
          };
          $scope.isFrontPage = function () {
            if ($route.current && $route.current.regexp) {
              return $route.current.regexp.test('/');
            } else {
              return false;
            }
          };
        }
    };
}]);
