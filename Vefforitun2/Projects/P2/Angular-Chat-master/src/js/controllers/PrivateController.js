angular.module('ChatApp').controller("PrivateController",
['$scope', '$location', '$routeParams', 'ChatFactory', 'UserFactory',
function ($scope, $location, $routeParams, ChatFactory, UserFactory) {
    if (UserFactory.name === undefined) {
        $location.path('/');
        return;
    }

    $scope.currentUser = UserFactory.name;
    $scope.selectedUser = undefined;
    $scope.messages = UserFactory.privateMsg;
    $scope.allUsers = undefined;

    ChatFactory.on('userlist', function (users) {
        $scope.users = users;
    });

    $scope.selectUser = function (user) {
        $scope.selectedUser = user;
    };

    $scope.sendMsg = function (msg) {
        if ($scope.selectedUser === undefined) {
            return;
        }
        ChatFactory.privateMsg({
            nick: $scope.selectedUser,
            message: msg
        },
            function (success) {
                if (success) {
                    if (UserFactory.privateMsg[$scope.selectedUser] === undefined) {
                        UserFactory.privateMsg[$scope.selectedUser] = [];
                    }
                    UserFactory.privateMsg[$scope.selectedUser].push({
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

    $scope.leave = function () {
        $location.path('/chat');
    };

    $scope.logOut = function () {
        ChatFactory.disconnectUser();
        UserFactory.reset();
        $location.path('/');
    };

    ChatFactory.getUsers();
}]);
