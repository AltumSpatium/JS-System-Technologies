let mainLayout = new kendo.Layout('mainLayout');

let router = new kendo.Router({routeMissing: (e) => console.log(e.url)});

router.bind('init', function() {
	mainLayout.render($('#app'));
});

router.route('/', function() {
	let cardsViewmodel = kendo.observable({
		searchText: null,
		cars: new kendo.data.DataSource({
			transport: {
				read: {
					url: '/api/cars',
				}
			}
		}),
		displayCar: function(e) {
			let id = e.data._id;
			router.navigate('/car/' + id);
		},
		searchKeypress: function(e) {
			if (e.keyCode == 13) {
				let text = cardsViewmodel.get('searchText');
				if (text) {
					router.navigate('/search/' + text);
				}
			}
		},
		searchClick: function(e) {
			e.preventDefault();
			let text = cardsViewmodel.get('searchText');
			if (text) {
				router.navigate('/search/' + text);
			}
		},
	});

	let cardsView = new kendo.View('cardsView', { model: cardsViewmodel, evalTemplate: true});
	mainLayout.showIn('#content', cardsView);
});

router.route('/car/:id', function(id) {
	let carViewmodel = kendo.observable({
		carID: id,
		isNotFound: false,
		errorMsg: null,
		car: new kendo.data.DataSource({
			transport: {
				read: function(options) {
					let id = carViewmodel.get("carID");

					$.ajax({
						url: '/api/car/' + id,
						success: function(response) {
							carViewmodel.set('isNotFound', false);
							options.success([response]);
						},
						error: function(response) {
							carViewmodel.set('errorMsg', response.responseText);
							carViewmodel.set('isNotFound', true);
							options.error([]);
						}
					});
				}
			}
		})
	});

	let carDetailsView = new kendo.View('carDetailsView', { model: carViewmodel, evalTemplate: true });
	mainLayout.showIn('#content', carDetailsView);
});

router.route('/search/(:text)', function(text, params) {
	let searchViewmodel = kendo.observable({
		searchResults: new kendo.data.DataSource({
			transport: {
				read: function(options) {
					$.ajax({
						url: '/api/search/' + text,
						success: function(response) {
							options.success(response);
						},
						error: function(response) {
							options.error([]);
						}
					});
				}
			},
		}),

		displayCar: function(e) {
			let id = e.data._id;
			router.navigate('/car/' + id);
		},

		selectedBrand: null,
		brands: new kendo.data.DataSource({
			transport: {
				read: {
					url: '/api/brands'
				}
			}
		}),
		onChange: function() {
			$("#modelInpField").data('kendoAutoComplete').dataSource.read();
		},

		selectedModel: null,
		models: new kendo.data.DataSource({
			transport: {
				read: {
					url: function() {
						let brand = searchViewmodel.get("selectedBrand");
						return '/api/models/' + brand;
					},
					dataType: 'json',
					cache: false
				}
			}
		}),

		selectedYear: [null, null],

		costFrom: null,
		costTo: null,
		cost: function() {
			return [this.get('costFrom'), this.get('costTo')];
		},
		onChangeCost: function(event) {
			if (event.values === undefined) {
				this.set('cost', [this.get("costFrom"), this.get('costTo')]);
			} else {
				let [costFrom, costTo] = event.values;
				this.set('costFrom', costFrom);
				this.set('costTo', costTo);
			}
		},

		mileageFrom: null,
		mileageTo: null,

		capacityFrom: null,
		capacityTo: null,

		selectedFuelType: null,

		isChecked: true,

		applyFilter: function(event) {
			event.preventDefault();

			let brand = this.get("selectedBrand");
			let model = this.get("selectedModel");
			let [yearFrom, yearTo] = this.get("selectedYear");
			let [costFrom, costTo] = [this.get("costFrom"), this.get("costTo")];
			let [mileageFrom, mileageTo] = [this.get("mileageFrom"), this.get("mileageTo")];
			let [capacityFrom, capacityTo] = [this.get("capacityFrom"), this.get("capacityTo")];
			let fuelType = this.get("selectedFuelType");
			let transmission = this.get("isChecked") ? "Автомат" : "Механика";

			if (text && brand) text = "";

			router.navigate('/search/' + text);
		}
	});

	let searchView = new kendo.View('searchView', { model: searchViewmodel, evalTemplate: true });
	mainLayout.showIn('#content', searchView);
});

$(function() {
	router.start();
});
