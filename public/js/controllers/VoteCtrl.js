angular.module('VoteCtrl', []).controller('VoteController', function($scope, $location, $http, $routeParams) {

	$scope.election = {};

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