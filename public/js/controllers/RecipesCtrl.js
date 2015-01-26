angular.module('RecipesCtrl', []).controller('RecipesController', function($scope, $http) {

	$scope.formData = {};

	$scope.categories = ['Korean', 'American', 'Italian', 'French', 'Mexican'];

	$http.get('/api/recipes')
		.success(function(data) {
			$scope.recipes = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$http.get('/api/ingredients')
		.success(function(data) {
			$scope.ingredients = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createRecipe = function() {
		$http.post('/api/recipes', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.recipes = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		console.log($scope.formData);
	};

	// $scope.updateRecipe = function(id, value) {
	// 	console.log(id);
	// 	console.dir(value);
	// 	$http.put('/api/ingredients/' + id, value)
	// 		.success(function(data) {
	// 			$scope.ingredients = data;
	// 			console.log(data);
	// 		})
	// 		.error(function(data) {
	// 			console.log('Error: ' + data);
	// 		});
	// };

	// $scope.deleteRecipe = function(id) {
	// 	$http.delete('/api/ingredients/' + id)
	// 		.success(function(data) {
	// 			$scope.ingredients = data;
	// 			console.log(data);
	// 		})
	// 		.error(function(data) {
	// 			console.log('Error: ' + data);
	// 		});
	// };

});