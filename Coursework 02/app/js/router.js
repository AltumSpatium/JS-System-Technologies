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

function fuelTypeDropDownListEditor(container, options) {
	$('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          	dataSource: ['Бензин', 'Дизель', 'Электро'],
           	filter: "contains",
           	minLength: 1
    });
}

function transmissionDropDownListEditor(container, options) {
	$('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
          	dataSource: ['Автомат', 'Механика'],
           	filter: "contains",
           	minLength: 1
    });
}

function imageUploadEditor(container, options) {
	$('<input type="file"/>')
        .appendTo(container)
        .kendoUpload({
        	async: {
        		saveUrl: '/api/admin',
        		autoUpload: true
        	},
        	success: function(e) {
        		let file = e.files[0].rawFile;
        		let fileReader = new FileReader();

        		fileReader.onloadend = function(e) {
        			let data = e.target.result;
        			options.model.image = data;
        			let id = options.model.id;
        			
        			if (id) {
        				$.ajax({
        					url: '/api/car/' + id,
        					method: 'PUT',
        					data: options.model.toJSON(),
        					success(response) {

        					}
        				});
        			} else {
        				$.ajax({
        					url: '/api/cars',
        					method: 'POST',
        					data: options.model.toJSON()
        				});
        			}
        		}

        		fileReader.readAsDataURL(file);
        	}
    });
}

router.route('/admin', function() {
	function init() {
		$('#carGrid').kendoGrid({
			columns: [
				{ field: "name", title: "Модель" },
				{ field: "brand", title: "Марка" },
				{ field: "year", title: "Год выпуска" },
				{ field: "mileage", title: "Пробег" },
				{ 
					field: "fuelType",
					title: "Тип топлива",
					editor: fuelTypeDropDownListEditor
				},
				{ field: "engineCapacity", title: "Объем двигателя" },
				{
					field: "transmission",
					title: "Трансмиссия",
					editor: transmissionDropDownListEditor
				},
				{
					field: "image",
					title: "Фото",
					width: 145,
					sortable: false,
					filterable: false,
				  	template: kendo.template($("#img-template").html()),
				  	editor: imageUploadEditor
				},
				{ field: "cost", title: "Цена", format: '{0:c0}' },
				{ command: ['destroy'], title: '&nbsp', width: '170px'}
			],
			dataSource: {
				transport: {
					read: function(options) {
						$.ajax({
							url: '/api/admin/',
							success: function(response) {
								options.success(response);
							}
						});			
					},
					update: function(options) {
						let id = options.data._id;

						$.ajax({
							url: '/api/car/' + id,
							method: 'PUT',
							data: options.data,
							success: function(response) {
								options.success();
							}
						});
					},
					destroy: function(options) {
						let id = options.data._id;

						$.ajax({
							url: 'api/car/' + id,
							method: 'DELETE',
							success: function(response) {
								options.success();
							}
						});
					},
					create: function(options) {
						$.ajax({
							url: '/api/cars',
							method: 'POST',
							data: options.data,
							success: function(response) {
								options.success();
							}
						});
					}
				},
				schema: {
					model: {
						id: '_id',
						fields: {
							name: {},
							brand: {},
							year: {type: 'number'},
							mileage: {type: 'number'},
							fuelType: {},
							engineCapacity: {type: 'number'},
							transmission: {},
							cost: {type: 'number'},
							image: {},
							pageVisits: {}
						}
					}
				},
				pageSize: 5
			},
			pageable: {
				refresh: true,
				pageSizes: true,
				buttonCount: 5
			},
			toolbar: ['create', 'save', 'cancel'],
			sortable: true,
			reorderable: true,
			resizable: true,
			filterable: true,
			columnMenu: true,
			editable: true
		});
	};

	let adminView = new kendo.View('adminView', { init: init, evalTemplate: true });
	mainLayout.showIn('#content', adminView);
});

function addCar() {
	router.navigate('/admin/create');
}

router.route('/admin/create', function() {
	let createCarViewmodel = kendo.observable({
		title: 'Добавить',
		btnText: 'Добавить',
		car: new kendo.data.DataSource({
			transport: {
				create: function(options) {
					$.ajax({
						url: '/api/cars',
						method: 'post',
						data: options.data,
						success: function(response) {
							options.success();
						}
					})
				}
			},
			schema: {
				model: {
					id: '_id',
					fields: {
						name: {},
						brand: {},
						year: {type: 'number'},
						mileage: {type: 'number'},
						fuelType: {},
						engineCapacity: {type: 'number'},
						transmission: {},
						cost: {type: 'number'},
						image: {},
						pageViews: {}
					}
				}
			}
		}),
		createCar: function(e) {
			e.preventDefault();
			console.log(createCarViewmodel.get('car'));
		},
		cancel: function() {

		}
	});

	let createCarView = new kendo.View('createCarView', { model: createCarViewmodel, evalTemplate: true });
	mainLayout.showIn('#content', createCarView);
});

$(function() {
	router.start();
});
