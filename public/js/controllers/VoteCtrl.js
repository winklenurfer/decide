angular.module('VoteCtrl', []).controller('VoteController', function($scope, $location, $http, $routeParams) {

	$scope.election = {};
    $scope.rank = [];

    // Loads an Election by the _id
    $scope.loadElectionById = function(election_id) {
        $http.get('/api/elections/' + election_id)
            .success(function(data) {
                $scope.election = data;
                $scope.setCandidates(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.setCandidates = function(election) {
        for (var candidate in election.candidates) {
            console.log(election.candidates[candidate]);
            $scope.rank.push(election.candidates[candidate].candidate);
        }
        console.log($scope.rank);
    };

    $scope.createVote = function() {
        $scope.data = {
            'election_id':$scope.election._id,
            'candidates':$scope.rank
        };

        $http.post('/api/votes', $scope.data)
            .success(function(data) {
                console.log(data);
                $location.path('/public');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.loadElectionById($routeParams.electionID);

});