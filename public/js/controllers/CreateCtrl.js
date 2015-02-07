angular.module('CreateCtrl', []).controller('CreateController', function($scope, $location, $http) {

    $scope.candidatesArray = [];
    $scope.formData = {};

	$scope.openElections = [
        {"name":"Awesome Election", "id":12345, "time": "11:35 PM 02/03/15"},
        {"name":"Rockin' Poll", "id":56789, "time": "07:20 AM 10/31/14"},
        {"name":"Cash Money", "id":19283, "time": "12:00 PM 01/01/15"}
    ];

    $scope.closedElections = [
        {"name":"Terrible Election", "id":54321, "time": "11:35 PM 02/03/15"},
        {"name":"No Money", "id":38291, "time": "12:00 PM 01/01/15"}
    ];

    $scope.openElection = function(election) {
        $location.path('/election/' + election.id);
    };

    $scope.addCandidate = function () {
        $scope.candidatesArray.push({
            placeholder: "Candidate"
        });
    };

    $scope.reset = function () {
        $scope.candidatesArray = [];
        $scope.formData = {};
    };

    $scope.createElection = function() {
        $http.post('/api/elections', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.elections = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        console.log($scope.formData);
    };

});