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
				let text = cardsViewmodel.get('searchText') || '';
				router.navigate('/search/' + text);
			}
		},
		searchClick: function(e) {
			e.preventDefault();
			let text = cardsViewmodel.get('searchText') || '';
			router.navigate('/search/' + text);
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
	function buildQuery(text, filterParams) {
		text = text || '';
		let query = text && filterParams.brand ? '?' : text + '?';

		for (let param in filterParams) {
			if (param !== '_back' && filterParams[param]) {
				query += param + '=' + filterParams[param] + '&';
			}
		}

		return query.slice(0, -1);
	}

	let searchViewmodel = kendo.observable({
		searchResults: new kendo.data.DataSource({
			transport: {
				read: function(options) {
					searchViewmodel.set('selectedBrand', params.brand || null);
					searchViewmodel.set('selectedModel', params.model || null);
					
					searchViewmodel.set('selectedYear', [Number(params.yearFrom) || 1970, Number(params.yearTo) || 2017]);

					searchViewmodel.set('costFrom', params.costFrom || null);
					searchViewmodel.set('costTo', params.costTo || null);

					searchViewmodel.set('mileageFrom', params.mileageFrom || null);
					searchViewmodel.set('mileageTo', params.mileageTo || null);

					searchViewmodel.set('capacityFrom', params.capacityFrom || null);
					searchViewmodel.set('capacityTo', params.capacityTo || null);

					searchViewmodel.set('selectedFuelType', params.fuelType || null);

					let transmission = params.transmission || null;
					if (transmission) transmission = transmission === 'Автомат' ? true : false;
					searchViewmodel.set('isChecked', transmission);

					$.ajax({
						url: '/api/search/' + buildQuery(text, params),
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

		selectedYear: null,

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

		isChecked: null,

		applyFilter: function(event) {
			event.preventDefault();

			let transmission = this.get('isChecked');
			if (transmission === true) transmission = 'Автомат';
			else if (transmission === false) transmission = 'Механика';
			else transmission = null;

			let filterParams = {
				brand: this.get("selectedBrand"),
				model: this.get("selectedModel"),
				yearFrom: this.get("selectedYear")[0],
				yearTo: this.get("selectedYear")[1],
				costFrom: this.get("costFrom"),
				costTo: this.get("costTo"),
				mileageFrom: this.get("mileageFrom"),
				mileageTo: this.get("mileageTo"),
				capacityFrom: this.get("capacityFrom"),
				capacityTo: this.get("capacityTo"),
				fuelType: this.get("selectedFuelType"),
				transmission: transmission
			}

			router.navigate('/search/' + buildQuery(text, filterParams));
		}
	});

	let searchView = new kendo.View('searchView', { model: searchViewmodel, evalTemplate: true });
	mainLayout.showIn('#content', searchView);
});

$(function() {
	router.start();
});
