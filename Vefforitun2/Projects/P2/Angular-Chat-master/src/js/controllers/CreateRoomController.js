angular.module('ChatApp').controller("CreateRoomController",
['$scope', '$mdDialog',
function ($scope, $mdDialog) {
    $scope.ok = function () {
        $mdDialog.hide({
            room: $scope.roomName,
            pass: $scope.roomPass,
            topic: $scope.roomTopic
        });
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);
