angular.module('ChatApp', ['ngMaterial', 'ngRoute']);

angular.module('ChatApp').config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    }).when('/chat/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    }).when('/chat/private', {
        templateUrl: 'views/private.html',
        controller: 'PrivateController'
    }).when('/chat/:roomId', {
        templateUrl: 'views/chat.html',
        controller: 'ChatController'
    }).otherwise({
        redirectTo: "/"
    });
}]);
