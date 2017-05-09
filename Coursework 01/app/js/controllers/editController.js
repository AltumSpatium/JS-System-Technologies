autoApp.controller('editController', function($scope, $http, $location, $routeParams) {
	$scope.title = 'Изменить';

	function updateCar() {
		$http.put('api/car/' + $scope.car._id, $scope.car);
		$location.path('/admin');
	}
	
	$http.get('api/car/' + $routeParams['id'])
		.then(function success(response) {
			$scope.car = response.data;
	});

	$scope.submit = function($event, form) {
		$event.preventDefault();

		if (form.$valid) {
			let image = document.getElementById('imageFile').files[0];
			if (image) {
				let fileReader = new FileReader();

				fileReader.onloadend = function(e) {
					let data = e.target.result;
					$scope.car.image = data;
					updateCar();
				}

				fileReader.readAsDataURL(image);
			} else {
				updateCar();
			}
		}
	};
});
