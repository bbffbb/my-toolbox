angular.module('ChatApp').controller('LoginController',
['$scope', '$location', 'ChatFactory', 'UserFactory', '$mdToast',
function ($scope, $location, ChatFactory, UserFactory, $mdToast) {
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 2);
    };
    $scope.signIn = function (username) {
        ChatFactory.adduser(username, function (success) {
            if (!success) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('This username is taken: ' + username)
                    .position('top right')
                    .hideDelay(3000)
                );
            } else {
                UserFactory.name = username;
                $location.path('/chat/');
                $scope.$apply();
            }
        });
    };
}]);
