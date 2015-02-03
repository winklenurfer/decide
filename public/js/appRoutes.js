angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

        .when('/public', {
            templateUrl: 'views/public.html',
            controller: 'PublicController'
        })

		.when('/recipes', {
			templateUrl: 'views/recipes.html',
			controller: 'RecipesController'
		})

		.when('/ingredients', {
			templateUrl: 'views/ingredients.html',
			controller: 'IngredientsController'	
		});

	$locationProvider.html5Mode(true);

}]);