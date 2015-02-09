angular.module('VoteCtrl', []).controller('VoteController', function($scope, $location, $http, $routeParams) {

	$scope.election = {};

    // Loads an Election by the _id
    $scope.loadElectionById = function(election_id) {
        $http.get('/api/elections/' + election_id)
            .success(function(data) {
                $scope.election = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //TODO - in vote_business add logic to create vote document for election (in vote collection or vote:id collection?)
    //$scope.voteOnElectionById = function(election_id) {};

    $scope.loadElectionById($routeParams.electionID);

    $scope.viewElection = function(election) {
        $location.path('/election/' + election.id + '/view');
    };

    $scope.voteElection = function(election) {
        $location.path('/election/' + election.id + '/vote');
    };

    $scope.editElection = function(election) {
        $location.path('/election/' + election.id + '/edit');
    };

});