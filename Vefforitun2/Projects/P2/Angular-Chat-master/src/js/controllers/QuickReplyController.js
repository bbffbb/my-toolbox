angular.module('ChatApp').controller("QuickReplyController",
['$scope', '$mdDialog', 'ChatFactory', 'UserFactory',
function ($scope, $mdDialog, ChatFactory, UserFactory) {
    $scope.privateUser = UserFactory.privateUser;
    $scope.privateMsg = UserFactory.privateMsg;
    $scope.title = "Private Chat with  " + $scope.privateUser;

    $scope.sendMsg = function (msg) {
        ChatFactory.privateMsg({ nick: $scope.privateUser, message: msg },
          function (success) {
              if (success) {
                  if (UserFactory.privateMsg[$scope.privateUser] === undefined) {
                      UserFactory.privateMsg[$scope.privateUser] = [];
                  }
                  UserFactory.privateMsg[$scope.privateUser].push({
                      nick: UserFactory.name,
                      timestamp: new Date(),
                      message: msg
                  });
                  $scope.$apply();
              }
              else { console.error("Error sending private message"); }
          }
        );
    };

    $scope.ok = function () {
        $mdDialog.hide({
            timestamp: $scope.timestamp,
            message: $scope.message
        });
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);
