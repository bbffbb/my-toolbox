
angular.module('ChatApp').controller("PasswordController",
['$scope', '$mdDialog', 'UserFactory',
function ($scope, $mdDialog, UserFactory) {
    $scope.room = UserFactory.chat;
    $scope.ok = function () {
        $mdDialog.hide($scope.password);
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);
