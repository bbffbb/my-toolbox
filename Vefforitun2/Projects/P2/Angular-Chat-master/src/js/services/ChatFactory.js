angular.module("ChatApp").factory('ChatFactory',
['$rootScope',
function ($rootScope) {
    var socket = io.connect('http://localhost:8080');
    var service = {};

    socket.on('connect', function () {
        console.log('connected to server');
    });
    socket.on('disconnect', function () {
        console.log('disconnected from server');
    });

    service.on = function (eventName, callback) {
        socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(service, args);
            });
        });
    };

    //-----------------------------------------------------
    // Client to Server Methods
    //-----------------------------------------------------

    //-----------------------------------------------------
    // Should get called after user logs in with the parameters
    // username and a callback function, which accepts a single
    // boolean parameter, stating if the username is available or not.
    service.adduser = function (username, callback) {
        socket.emit("adduser", username, callback);
    };

    //-----------------------------------------------------
    // Should get called to receive a list of available rooms.
    // The server responds by emitting the "roomlist" event.
    service.getRooms = function () {
        socket.emit("rooms");
    };

    //-----------------------------------------------------
    // This should get called to get a list of all connected users.
    // There are no parameters for this function.
    service.getUsers = function () {
        socket.emit("users");
    };

    //-----------------------------------------------------
    // Should get called when a user wants to join a room.
    // Parameters: an object {
    // room: "the id of the room, undefined if the user is creating a new room",
    // pass: "a room password - not required"
    // } and a callback function which accepts two parameters:
    // a boolean parameter, stating if the request was successful or not.
    // and a string with the reason why the join wasn't successful.
    service.joinRoom = function (roomData, callback) {
        console.log("joinRoom");
        socket.emit("joinroom", roomData, callback);
    };

    //-----------------------------------------------------
    // Should get called when a user wants to send a message to a room.
    // Parameter: an object {
    // roomName: "the room identifier",
    // msg: "The message itself, only the first 200 chars are considered valid"
    //}
    service.sendMsg = function (msgObj) {
        socket.emit("sendmsg", msgObj);
    };

    //-----------------------------------------------------
    // Used if the user wants to send a private message to another user.
    // Parameters: an object {
    // nick: "the userid which the message should be sent to",
    // message: "The message itself"
    // } and  a callback function, accepting a single boolean parameter,
    // stating if the message could be sent or not.
    service.privateMsg = function (msgObj, callback) {
        socket.emit("privatemsg", msgObj, callback);
    };
    //-----------------------------------------------------
    // Used when a user wants to leave a room.
    // Parameters: a single string, i.e. the ID of the room.
    service.leaveRoom = function (roomId) {
        socket.emit("partroom", roomId);
    };

    //-----------------------------------------------------
    // When a room creator wants to kick a user from the room.
    // Parameters: an object {
    // user : "The username of the user being kicked",
    // room: "The ID of the room"
    // } and a callback function, accepting a single boolean parameter,
    // stating if the user could be kicked or not.
    service.kickUser = function (kickObj, callback) {
        socket.emit("kick", kickObj, callback);
    };

    //-----------------------------------------------------
    // Allows an operator to ban another user from a room.
    // Parameters: an object {
    // user : "The username of the user being banned",
    // room: "The ID of the room"
    // } and a callback function, accepting a single boolean parameter,
    // stating if the user could be banned or not.
    service.banUser = function (banObj, callback) {
        socket.emit("ban", banObj, callback);
    };

    //-----------------------------------------------------
    // Used when a user leaves the chat application.
    // No parameters
    service.disconnectUser = function () {
        console.log("disconnect user");
        socket.emit("disconnectUser");
    };

    return service;
}]);
