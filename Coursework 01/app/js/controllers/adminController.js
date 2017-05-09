autoApp.controller('adminController', function($scope, $http, $q, $location) {
	let deferred = $q.defer();
	let all = [];
	let table;

	$http.get('api/admin')
		.then(function success(response) {
			all = response.data;
			$scope.cars = response.data;
	});

	$scope.search = function(text) {
		$http.get('api/search/' + text)
			.then(function success(response) {
				if (response.data.length > 0) {
					$scope.cars = response.data;
					deferred.resolve(response.data);
				}
			}, function error(err) {
				$scope.cars = all;
				deferred.resolve(all);
		});

		$scope.cars = deferred.promise;
	};

	$scope.editCar = function($event) {
		if (table === undefined) {
			table = $('table').DataTable({'sDom': ''});
		}

		let row = table.row($($event.currentTarget).parents('tr'));
		let id = row.data()[0];

		$location.path('/admin/edit/' + id);
	};

	$scope.deleteCar = function($event) {
		if (table === undefined) {
			table = $('table').DataTable({'sDom': ''});
		}

		let row = table.row($($event.currentTarget).parents('tr'));
		let id = row.data()[0];
		
		$http.delete('/api/car/' + id)
			.then(function sucess(response) {
				row.remove().draw();
		});
	};
});
