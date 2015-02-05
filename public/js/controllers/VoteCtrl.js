angular.module('VoteCtrl', []).controller('VoteController', function($scope, $location) {

	$scope.election = {
        "name":"Awesome Election",
        "id":12345,
        "time": "11:35 PM 02/03/15",
        "options": ["Pizza", "Sandwich", "Chinese", "Taco", "Vegetarian"]
    };

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