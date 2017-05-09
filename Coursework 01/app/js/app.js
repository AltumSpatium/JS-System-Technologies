let autoApp = angular.module('autoApp', ['ngRoute']);
autoApp.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/', {
			templateUrl: 'app/views/main.html',
			controller: 'mainController'
		})
		.when('/car/:id', {
			templateUrl: 'app/views/cardetails.html',
			controller: 'carController'
		})
		.when('/search/:text', {
			templateUrl: 'app/views/search.html',
			controller: 'searchController'
		})
		.when('/admin', {
			templateUrl: 'app/views/admin.html',
			controller: 'adminController'
		})
		.when('/admin/create', {
			templateUrl: 'app/views/car.html',
			controller: 'createController'
		})
		.when('/admin/edit/:id', {
			templateUrl: 'app/views/car.html',
			controller: 'editController'
		})
		.otherwise({redirectTo: '/'});
});
