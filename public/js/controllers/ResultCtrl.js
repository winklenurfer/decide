angular.module('ResultCtrl', []).controller('ResultController', function($scope) {

	$scope.results = [
        {"name":"Pizza", "percent":56},
        {"name":"Chinese", "percent":25},
        {"name":"Taco", "percent":19}
    ];

    $scope.dropped = ["Sandwich", "Vegetarian"];

});