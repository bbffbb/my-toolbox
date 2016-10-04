angular.module('ChatApp').factory('UserFactory',
function () {
    var service = {
        name: undefined,
        chat: undefined,
        chatPass: undefined,
        chatTopic: undefined,
        privateMsg: {},
        privateUser: undefined
    };

    service.reset = function () {
        service.name = undefined;
        service.chat = undefined;
        service.chatPass = undefined;
        service.chatTopic = undefined;
        service.privateMsg = {};
        service.privateUser = undefined;
    };

    service.store = function () {
        //$cookies.put('userName', service.name);
        //$cookies.put('userChat', service.chat);
        //$cookies.put('userChatPass', service.chatPass);
        //$cookies.put('userChatTopic', service.chatTopic);
    };

    service.retrieve = function () {
        //service.name = $cookies.get('userName');
        //service.chat = $cookies.get('userChat');
        //service.chatPass = $cookies.get('userChatPass');
        //service.chatTopic = $cookies.get('userChatTopic');
    };
    return service;
});
