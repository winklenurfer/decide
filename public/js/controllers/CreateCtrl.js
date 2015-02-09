angular.module('CreateCtrl', []).controller('CreateController', function($scope, $location, $http) {

    $scope.candidatesArray = [];
    $scope.formData = {};

    $scope.addCandidate = function () {
        $scope.candidatesArray.push({
            placeholder: "Candidate"
        });
    };

    $scope.reset = function () {
        $scope.candidatesArray = [];
        $scope.formData = {};
    };

    // Create election and then take user to the vote page
    $scope.createElection = function() {
        $http.post('/api/elections', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.elections = data;
                console.log(data);
                $location.path('/election/' + data._id + '/vote');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});