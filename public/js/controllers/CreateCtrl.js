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