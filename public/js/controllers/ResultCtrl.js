angular.module('ResultCtrl', []).controller('ResultController', function($scope, $http, $routeParams) {

    $scope.election = {};
    $scope.results = [];
    $scope.dropped = [];

    $scope.electionID = $routeParams.electionID;

    // Loads an Election by the _id
    $scope.loadElectionById = function(election_id) {
        $http.get('/api/elections/' + election_id)
            .success(function(data) {
                $scope.election = data;
                $scope.setTally(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Set the results array
    $scope.setTally = function(election) {
        for (var candidate in election.candidates) {
            console.log(election.candidates[candidate]);
            if (!election.candidates[candidate].dropped) {
                $scope.results.push({"name":election.candidates[candidate].candidate, "percent":election.candidates[candidate].percent});
            } else {
                $scope.dropped.push(election.candidates[candidate].candidate);
            }
        }
        console.log($scope.results);
    };

    // Use the routeParams to load the election by the ID
    $scope.loadElectionById($scope.electionID);

});