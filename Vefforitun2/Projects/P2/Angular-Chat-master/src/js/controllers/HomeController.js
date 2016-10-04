angular.module('ChatApp').controller("HomeController",
['$scope', '$location', '$mdToast', '$mdDialog', 'ChatFactory', 'UserFactory',
function ($scope, $location, $mdToast, $mdDialog, ChatFactory, UserFactory) {
    if (UserFactory.name === undefined) {
        $location.path('/');
        return;
    }
    $scope.title = 'Welcome ' + UserFactory.name;
    ChatFactory.on('roomlist', function (roomslist) {
        $scope.rooms = roomslist;
    });

    ChatFactory.on('servermessage', function (msg) {
        if (msg === 'join' || msg === 'part') {
            ChatFactory.getRooms();
        }
    });

    ChatFactory.on('recv_privatemsg', function (username, msg) {
        if (UserFactory.privateMsg[username] === undefined) {
            UserFactory.privateMsg[username] = [];
        }
        UserFactory.privateMsg[username].push({
            nick: username,
            timestamp: new Date(),
            message: msg
        });
    });

    $scope.create = function (ev) {
        $mdDialog.show({
            controller: 'CreateRoomController',
            templateUrl: '/views/createRoom.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function (newRoom) {
            UserFactory.chat = newRoom.room;
            UserFactory.chatPass = newRoom.pass;
            UserFactory.chatTopic = newRoom.topic;
            $location.path('/chat/' + UserFactory.chat);
        });
    };

    $scope.logOut = function () {
        ChatFactory.disconnectUser();
        $location.path('/');
    };

    $scope.goToRoom = function (room, ev) {
        UserFactory.chat = room;
        if ($scope.rooms[room].locked) {
            $mdDialog.show({
                controller: 'PasswordController',
                templateUrl: '/views/password.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (password) {
                UserFactory.chatPass = password;
                $location.path('/chat/' + room);
            });
        } else {
            $location.path('/chat/' + room);
        }
    };

    $scope.goPrivate = function () {
        $location.path('/chat/private');
    };

    $scope.isBanned = function (room) {
        var ban = false;
        angular.forEach(Object.keys($scope.rooms[room].banned), function (val) {
            if (val === UserFactory.name) {
                ban = true;
            }
        });
        return ban;
    };

    $scope.countUsers = function (users) {
        var count = 0;
        angular.forEach(users, function () {
            count++;
        });
        return count;
    };

    ChatFactory.getRooms();
}]);
