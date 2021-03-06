let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let chunkify = require('./app/js/utils/chunkify.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/autodb');

let app = express();
let jsonParser = bodyParser.json({limit: '50mb'});
let urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true});

let Car = require('./app/js/models/car.js');

app.use(express.static(__dirname));
app.use(jsonParser);
app.use(urlencodedParser);

app.route('/api/cars')
	.get(function(req, res) {
		Car.find({}).sort('-pageVisits').limit(25).exec(function(err, cars) {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			}

			res.send(chunkify(cars, 5));
		});
	})
	.post(function(req, res) {
		if (!req.body) res.sendStatus(400);

		let car = new Car({
			name: req.body.name,
			brand: req.body.brand,
			cost: req.body.cost,
			year: req.body.year,
			mileage: req.body.mileage,
			engineCapacity: req.body.engineCapacity,
			fuelType: req.body.fuelType,
			transmission: req.body.transmission,
			image: req.body.image,
			pageVisits: 0
		});
		car.save();

		res.end();
});

app.get('/api/brands', function(req, res) {
	Car.find({}).distinct("brand").exec(function(err, brands) {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(brands);
		}
	});
});

app.get('/api/models/:brand', function(req, res) {
	Car.find({brand: new RegExp('^' + req.params.brand.toLowerCase(), "i")})
	   .distinct("name").exec(function(err, models) {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(models);
		}
	});
});

app.route('/api/car/:id')
	.get(function(req, res) {
		Car.findByIdAndUpdate(req.params.id, {$inc: {pageVisits: 1}}, function(err, car) {
			if (err) {
				console.log(err);
				res.status(404).sendFile(__dirname + '/app/views/notfound.html');
			} else {
				res.send(car);
			}
		});
	})
	.delete(function(req, res) {
		Car.findByIdAndRemove(req.params.id, function(err, car) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.end();
			}
		});
	})
	.put(function(req, res) {
		console.log(res.body);
		Car.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			brand: req.body.brand,
			cost: req.body.cost,
			year: req.body.year,
			mileage: req.body.mileage,
			engineCapacity: req.body.engineCapacity,
			fuelType: req.body.fuelType,
			transmission: req.body.transmission,
			image: req.body.image,
			pageVisits: req.body.pageVisits
		}, function(err, car) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.end();
			}
		});
	})
	.post(function(req, res) {
		Car.findByIdAndUpdate(req.params.id, {
		}, function(err, car) {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.end();
			}
		});		
});

app.get('/api/admin', function(req, res) {
	Car.find({}, function(err, cars) {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(cars);
		}
	});
});

app.post('/api/admin', function(req, res) {
	res.end();
});

app.get('/api/search/:text*?', function(req, res) {
	let query;
	let brand = req.query.brand;
	let model = req.query.model;

	if (brand || model) {
		query = Car.find({});

		if (brand)
			query = query.where('brand').equals(brand);
		if (model)
			query = query.where('name').equals(model);
	} else {
		if (req.params.text)
			query = Car.find({$text : {$search: req.params.text}});
		else query = Car.find({});
	}

	if (req.query.yearFrom)
		query = query.where('year').gt(parseInt(req.query.yearFrom) - 1);
	if (req.query.yearTo)
		query = query.where('year').lt(parseInt(req.query.yearTo) + 1);

	if (req.query.costFrom)
		query = query.where('cost').gt(parseInt(req.query.costFrom) - 1);
	if (req.query.costTo)
		query = query.where('cost').lt(parseInt(req.query.costTo) + 1);

	if (req.query.mileageFrom)
		query = query.where('mileage').gt(parseInt(req.query.mileageFrom) - 1);
	if (req.query.mileageTo)
		query = query.where('mileage').lt(parseInt(req.query.mileageTo) + 1);

	if (req.query.capacityFrom)
		query = query.where('engineCapacity').gt(parseInt(req.query.capacityFrom) - 1);
	if (req.query.capacityTo)
		query = query.where('engineCapacity').lt(parseInt(req.query.capacityTo) + 1);

	if (req.query.fuelType)
		query = query.where('fuelType').equals(req.query.fuelType);

	if (req.query.transmission)
		query = query.where('transmission').equals(req.query.transmission);

	query.sort('-pageVisits').exec(function(err, cars) {
		if (err) {
			console.log(err);
			console.log('error');
			res.sendStatus(400);
		} else {
			res.send(cars);
		}
	});
});

app.listen(3000);
