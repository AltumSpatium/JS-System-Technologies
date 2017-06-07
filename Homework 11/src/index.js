import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Card(props) {
	const car = props.car;
	if (!car) return null;
	
	const name = car.name || '';
	const brand = car.brand || '';
	const year = car.year || '';
	const mileage = car.mileage || '';
	const fuelType = car.fuelType || '';
	const engineCapacity = car.engineCapacity || '';
	const transmission = car.transmission || '';
	const cost = car.cost || '';
	const image = car.image || '';

	return (
		<div className="card btn">
			<img src={image} width="180px" height="120px" alt="" />
			<p className="card-info-name"><strong>{brand} {name}</strong></p>
			<div className="clear"></div>
			<p className="card-info-year">{year}</p>
			<div className="card-info">
				<p>{mileage} км</p>
				<p>{fuelType}</p>
				<p>{engineCapacity} см<sup>3</sup></p>
				<p>{transmission}</p>
				<p>{cost}$</p>
			</div>
		</div>
	);
}

class CardRow extends Component {
	renderCard(car) {
		return <Card car={car}/>;
	}

	render() {
		const cars = this.props.cars;
		return (
			<div className="card-wrapper">
				<div>
					{this.renderCard(cars[0])}
					{this.renderCard(cars[1])}
					{this.renderCard(cars[2])}
					{this.renderCard(cars[3])}
					{this.renderCard(cars[4])}
					<div style={{clear: 'both'}}></div>
				</div>
			</div>
		);
	}
}

class CardField extends Component {
	constructor() {
		super();
		this.state = {
			cars: this.loadCars()
		}
	}

	loadCars() {
		const cars = [];
		for (let i = 0; i < 35; i++) {
			cars.push(JSON.parse(localStorage.getItem('car' + i)));
		}

		return cars;		
	}

	render() {
		const cars = this.state.cars.slice();

		return (
			<div className="row-wrapper">
				<CardRow cars={cars.slice(0, 5)}/>
				<CardRow cars={cars.slice(5, 10)}/>
				<CardRow cars={cars.slice(10, 15)}/>
				<CardRow cars={cars.slice(15, 20)}/>
				<CardRow cars={cars.slice(20, 25)}/>
			</div>
		)
	}
}

ReactDOM.render(<CardField />, document.getElementById('root'));
