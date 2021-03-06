angular.module('noagendaqsoparty').controller('RegisterCtrl', function ($scope, $controller, $location, events, sha, Contestant) {
    // this call to $controller adds the base controller's methods
    // and properties to the controller's scope
    $controller('BaseCtrl', {$scope: $scope});

    $scope.contestant = new Contestant();
    $scope.password = "";
    $scope.confirmpassword = "";

    $scope.register = function () {
        $scope.contestant.userName = $scope.contestant.userName.toUpperCase();
        $scope.contestant.DateJoined = new Date();
        $scope.contestant.Password = sha.hash($scope.password + $scope.contestant.DateJoined.valueOf().toString());
        $scope.publish(events.message._CREATE_CONTESTANT_, [$scope.contestant]);
    };

    $scope.onBrewerRegisterComplete = function () {
        $location.path('/');
    };

    $scope.subscribe(events.message._CREATE_CONTESTANT_COMPLETE_, $scope.onBrewerRegisterComplete);
});