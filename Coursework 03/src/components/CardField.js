import React, { Component } from 'react'
import CardRow from './CardRow'
import '../style/CardField.css'

export default class CardField extends Component {
	constructor() {
		super();
		this.state = {
			cars: null
		};
	}

	loadCars() {
		fetch('/api/cars')
			.then(response => response.json())
			.then(json => this.setState({cars: json}))
			.catch(error => console.log(error));	
	}

	componentDidMount() {
		this.loadCars();
	}

	render() {
		if (!this.state.cars) return null;
		const cars = this.state.cars.slice();

		return (
			<div className="row-wrapper">
				<CardRow cars={cars[0].cols}/>
				<CardRow cars={cars[1].cols}/>
				<CardRow cars={cars[2].cols}/>
				<CardRow cars={cars[3].cols}/>
				<CardRow cars={cars[4].cols}/>
			</div>
		)
	}
}
