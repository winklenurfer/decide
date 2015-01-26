angular.module('IngredientsCtrl', []).controller('IngredientsController', function($scope, $http) {

	$scope.formData = {};
	$scope.inPantryChange = {};

	$scope.categories = ['Generic', 'Dairy', 'Fruits', 'Grains', 'Meat', 'Seasoning', 'Sweets', 'Vegetables'];

	$http.get('/api/ingredients')
		.success(function(data) {
			$scope.ingredients = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createIngredient = function() {
		$http.post('/api/ingredients', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.ingredients = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.updateIngredient = function(id, value) {
		console.log(id);
		console.dir(value);
		$http.put('/api/ingredients/' + id, value)
			.success(function(data) {
				$scope.ingredients = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteIngredient = function(id) {
		$http.delete('/api/ingredients/' + id)
			.success(function(data) {
				$scope.ingredients = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

});