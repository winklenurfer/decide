angular.module('EditCtrl', []).controller('EditController', function($scope) {

	$scope.votes = 17;

    $scope.election = {
        "name":"Awesome Election",
        "id":12345,
        "time": "11:35 PM 02/03/15",
        "options": ["Pizza", "Sandwich", "Chinese", "Taco", "Vegetarian"]
    };

});