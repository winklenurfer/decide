angular.module('PublicCtrl', []).controller('PublicController', function($scope, $location, $http) {

    $scope.openElections = [];

    $scope.closedElections = [];

    $scope.loadElections = function() {
        $http.get('/api/elections')
            .success(function(data) {
                $scope.setElections(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.setElections = function(elections) {
        for (var election in elections) {
            if (elections[election].running) {
                $scope.openElections.push(elections[election]);
            } else {
                $scope.closedElections.push(elections[election]);
            }
        }
    };

    $scope.loadElections();

    $scope.viewElection = function(election) {
        $location.path('/election/' + election._id + '/result');
    };

    $scope.voteElection = function(election) {
        $location.path('/election/' + election._id + '/vote');
    };

    $scope.editElection = function(election) {
        $location.path('/election/' + election._id + '/edit');
    };

});