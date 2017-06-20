let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let chunkify = require('./src/utils/chunkify.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/autodb');

let app = express();
let jsonParser = bodyParser.json({limit: '50mb'});
let urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true});

let Car = require('./src/models/car.js');

app.use(express.static(__dirname));
app.use(jsonParser);
app.use(urlencodedParser);

app.route('/api/cars')
	.get((req, res) => {
		Car.find({}).sort('-pageVisits').limit(25).exec((err, cars) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			}

			res.send(chunkify(cars, 5));
		});
	})
	.post((req, res) => {
		if (!req.body) res.sendStatus(400);

		let car = new Car(Object.assign({}, req.body, {pageVisits: 0}));
		car.save();

		res.end();
});

app.get('/api/brands', (req, res) => {
	Car.find({}).distinct("brand").exec((err, brands) => {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(brands);
		}
	});
});

app.get('/api/models/:brand', (req, res) => {
	Car.find({brand: new RegExp('^' + req.params.brand.toLowerCase(), "i")})
	   .distinct("name").exec((err, models) => {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(models);
		}
	});
});

app.route('/api/car/:id')
	.get((req, res) => {
		Car.findByIdAndUpdate(req.params.id, {$inc: {pageVisits: 1}}, (err, car) => {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.send(car);
			}
		});
	})
	.delete((req, res) => {
		Car.findByIdAndRemove(req.params.id, (err, car) => {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.end();
			}
		});
	})
	.put((req, res) => {
		Car.findByIdAndUpdate(req.params.id,
			Object.assign({}, req.body), (err, car) => {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.end();
			}
		});
	})
	.post((req, res) => {
		Car.findByIdAndUpdate(req.params.id, {
		}, (err, car) => {
			if (err) {
				console.log(err);
				res.sendStatus(404);
			} else {
				res.end();
			}
		});		
});

app.get('/api/admin', (req, res) => {
	Car.find({}, (err, cars) => {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(cars);
		}
	});
});

app.get('/api/search/:text*?', (req, res) => {
	let query;
	let brand = req.query.brand;
	let model = req.query.model;
	console.log(req.params.brand);

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

	query.sort('-pageVisits').exec((err, cars) => {
		if (err) {
			console.log(err);
			res.sendStatus(400);
		} else {
			res.send(cars);
		}
	});
});

app.listen(3001);
