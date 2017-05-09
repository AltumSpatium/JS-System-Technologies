autoApp.controller('carController', function($scope, $http, $routeParams, $sce) {
	$scope.loaded = false;

	$http.get('api/car/' + $routeParams['id'])
		.then(function success(response) {
			console.log(response);
			$scope.loaded = true;
			$scope.car = response.data;
		}, function error(err) {
			console.log(err);
			$scope.loaded = false;
			$scope.error = $sce.trustAsHtml(err.data);
	});

	$scope.convertCurrency = function(byn, currency) {
		let modifier = currency === 'euro' ? 0.48 : 0.528773;
		return Math.ceil(byn * modifier);
	};
});
