angular.module('EditCtrl', []).controller('EditController', function($scope, $http, $routeParams, $window, $location) {

	$scope.numVotes = 17;
    $scope.candidatesArray = [];
    $scope.election = {};
    $scope.votes = [];
    $scope.electionID = $routeParams.electionID;

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

    // Loads Votes by the election_id
    $scope.loadVotesByElectionId = function(election_id) {
        $http.get('/api/votes/election/' + election_id)
            .success(function(data) {
                $scope.votes = data;
                $scope.setNumVotes(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete Election by the _id
    $scope.deleteElection = function() {

        if($window.confirm('Are you sure you want to permanently delete this Election?')) {
            $http.delete('/api/elections/' + $scope.electionID)
                .success(function(data) {
                    $location.path('/public');
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    // Set the candidates array with the candidates
    $scope.setCandidates = function(election) {
        for (var candidate in election.candidates) {
            console.log(election.candidates[candidate]);
            $scope.candidatesArray.push(election.candidates[candidate].candidate);
        }
        console.log($scope.candidatesArray);
    };

    $scope.setNumVotes = function(votes) {
        $scope.numVotes = votes.length;
    }

    // Use the routeParams to load the election and votes by the ID
    $scope.loadElectionById($scope.electionID);
    $scope.loadVotesByElectionId($scope.electionID);

});