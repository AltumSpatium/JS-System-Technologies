let mongoose = require('mongoose');

let carSchema = new mongoose.Schema({
	name: String,
	brand: String,
	cost: Number,
	year: Number,
	mileage: Number,
	engineCapacity: Number,
	fuelType: String,
	transmission: String,
	image: String,
	pageVisits: Number
});

carSchema.index({name: 'text', brand: 'text'});

module.exports = mongoose.model('Car', carSchema);
