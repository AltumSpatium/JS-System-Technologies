autoApp.controller('mainController', function($scope, $http, $location) {
	$http.get('api/cars')
		.then(function success(response) {
			$scope.cars = response.data;
	});

	$scope.search = function($event) {
		if ($event.keyCode === 13) {
			text = $('search-input').val();

			$location.path('/search/' + text);
		}
	};

	$scope.convertCurrency = function(byn, currency) {
		let modifier = currency === 'euro' ? 0.48 : 0.528773;
		return Math.ceil(byn * modifier);
	};
});
