import React, { Component } from 'react'
import CardRow from './CardRow'
import '../style/CardField.css'

export default class CardField extends Component {
	constructor() {
		super();
		this.state = {
			cars: this.loadCars()
		}
	}

	loadCars() {
		// TODO loading from server
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
