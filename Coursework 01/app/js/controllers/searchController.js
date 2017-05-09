autoApp.controller('searchController', function($scope, $http, $routeParams, $location) {
	function buildQuery() {
		let query = '?';
		for (let param in $scope.filter) {
			query += param + '=' + $scope.filter[param] + '&';
		}
		return query.slice(0, -1);
	}

	$scope.searchText = $routeParams['text'];
	$scope.notFoundMsg = 'Ничего не найдено';
	$scope.found = false;
	$scope.cars = [];
	$scope.filter = {};

	for (let param in $location.search()) {
		if (param === 'fuelType' || param === 'transmission') {
			$scope.filter[param] = $location.search()[param];
		} else {
			$scope.filter[param] = Number($location.search()[param]);
		}
	}


	$http.get('api/search/' + $scope.searchText + buildQuery())
		.then(function success(response) {
			$scope.cars = response.data;
			if ($scope.cars.length > 0) $scope.found = true;
	});

	$scope.search = function($event) {
		$event.preventDefault();

		let query = $location.path('/search/' + $scope.searchText);
		for (let param in $scope.filter) {
			query.search(param, $scope.filter[param]);
		}
	};
});
