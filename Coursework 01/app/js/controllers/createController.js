autoApp.controller('createController', function($scope, $http, $location) {
	$scope.title = 'Добавить';

	$scope.submit = function($event, form) {
		$event.preventDefault();

		if (form.$valid) {
			let image = document.getElementById('imageFile').files[0];
			let fileReader = new FileReader();

			fileReader.onloadend = function(e) {
				let data = e.target.result;
				$scope.car.image = data;

				$http.post('api/cars', $scope.car);
				$location.path('/admin');
			}

			fileReader.readAsDataURL(image);
		}
	};
});
