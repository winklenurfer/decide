angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/public.html',
			controller: 'PublicController'
		})

        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .when('/public', {
            templateUrl: 'views/public.html',
            controller: 'PublicController'
        })

        .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateController'
        })

        .when('/election/:electionID/result', {
            templateUrl: 'views/result.html',
            controller: 'ResultController'
        })

        .when('/election/:electionID/vote', {
            templateUrl: 'views/vote.html',
            controller: 'VoteController'
        })

        .when('/election/:electionID/edit', {
            templateUrl: 'views/edit.html',
            controller: 'EditController'
        })

	$locationProvider.html5Mode(true);

}]);