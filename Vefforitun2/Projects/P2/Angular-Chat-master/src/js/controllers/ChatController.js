angular.module('ChatApp').controller("ChatController",
['$scope', '$location', '$mdDialog', '$mdToast', 'ChatFactory', 'UserFactory',
function ($scope, $location, $mdDialog, $mdToast, ChatFactory, UserFactory) {
    if (UserFactory.name === undefined) {
        $location.path('/');
        return;
    }

    $scope.currentUser = UserFactory.name;
    $scope.privateMessages = UserFactory.privateMsg;
    $scope.currentRoom = "Current Room: " + UserFactory.chat;
    $scope.title = "Welcome " + UserFactory.name;
    $scope.selectedUser = undefined;
    $scope.quickReply = [];

    ChatFactory.on('recv_privatemsg', function (username) {
        if ($scope.quickReply.indexOf(username) === -1) {
            $scope.quickReply.push(username);
        }
    });

    ChatFactory.on('updateusers', function (roomId, users, ops) {
        $scope.room = roomId;
        $scope.users = users;
        $scope.ops = ops;
    });

    ChatFactory.on('updatechat', function (room, messageHistory) {
        $scope.room = room;
        $scope.messages = messageHistory;
    });

    ChatFactory.on('updatetopic', function (room, topic) {
        $scope.room = room;
        $scope.topic = topic;
    });

    ChatFactory.on('kicked', function (room, user) {
        if (user === UserFactory.name) {
            $mdToast.show(
                $mdToast.simple()
                .textContent('You have been kicked from ' + room)
                .position('top right')
                .hideDelay(3000)
            );
            UserFactory.chat = undefined;
            $location.path('/chat');
        }
    });
    ChatFactory.on('banned', function (room, user) {
        if (user === UserFactory.name) {
            $mdToast.show(
                $mdToast.simple()
                .textContent('You have been banned from ' + room)
                .position('top right')
                .hideDelay(3000)
            );
            UserFactory.chat = undefined;
            $location.path('/chat');
        }
    });

    $scope.sendMsg = function (msg) {
        var message = ' ' + msg;
        ChatFactory.sendMsg({
            roomName: UserFactory.chat,
            msg: message
        });
    };

    $scope.kickUser = function () {
        ChatFactory.kickUser({
            user: $scope.selectedUser,
            room: UserFactory.chat
        },
            function (success) {
                if (success) {
                    console.log($scope.selectedUser + ' was kicked from room');
                    $scope.selectedUser = undefined;
                } else {
                    console.log('Kicking ' + $scope.selectedUser + ' failed');
                }
            });
    };

    $scope.banUser = function () {
        ChatFactory.banUser({ user: $scope.selectedUser, room: UserFactory.chat }, function (success) {
            if (success) {
                console.log($scope.selectedUser + ' was banned from room');
                $scope.selectedUser = undefined;
            } else {
                console.log('Banning ' + $scope.selectedUser + ' failed');
            }
        });
    };

    $scope.isOp = function () {
        var op = false;
        angular.forEach($scope.ops, function (value) {
            if (value === UserFactory.name) {
                op = true;
            }
        });
        return op;
    };

    $scope.setPrivate = function (user) {
        $scope.selectedUser = user;
    };

    $scope.leave = function () {
        ChatFactory.sendMsg({ roomName: UserFactory.chat, msg: ' just left the room.' });
        ChatFactory.leaveRoom(UserFactory.chat);
        UserFactory.chat = undefined;
        $location.path('/chat');
    };

    $scope.logOut = function () {
        ChatFactory.sendMsg({ roomName: UserFactory.chat, msg: ' just left the room.' });
        ChatFactory.disconnectUser();
        UserFactory.reset();
        $location.path('/');
    };

    $scope.goToPrivateChat = function (user, ev) {
        UserFactory.privateUser = user;
        $mdDialog.show({
            controller: 'QuickReplyController',
            templateUrl: '/views/quickReply.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    ChatFactory.joinRoom({
        room: UserFactory.chat,
        pass: UserFactory.chatPass,
        topic: UserFactory.chatTopic
    }, function (success) {
        if (success) {
            ChatFactory.sendMsg({
                roomName: UserFactory.chat,
                msg: ' just joined the room.'
            });
        } else {
            if (UserFactory.chatPass !== undefined) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Wrong password')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
            $location.path('/chat');
        }
    });
}]);
