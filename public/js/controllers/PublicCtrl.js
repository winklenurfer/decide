angular.module('PublicCtrl', []).controller('PublicController', function($scope, $location) {

	$scope.openElections = [
        {"name":"Awesome Election", "id":12345, "time": "11:35 PM 02/03/15"},
        {"name":"Rockin' Poll", "id":56789, "time": "07:20 AM 10/31/14"},
        {"name":"Cash Money", "id":19283, "time": "12:00 PM 01/01/15"}
    ];

    $scope.closedElections = [
        {"name":"Terrible Election", "id":54321, "time": "11:35 PM 02/03/15"},
        {"name":"No Money", "id":38291, "time": "12:00 PM 01/01/15"}
    ];

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