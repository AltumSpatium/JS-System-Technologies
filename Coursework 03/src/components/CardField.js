import React, { Component } from 'react'
import CardRow from './CardRow'
import Loader from 'react-loader'

import '../style/CardField.css'

export default class CardField extends Component {
	constructor() {
		super();
		this.state = {
			cars: null,
			loaded: false
		};
	}

	loadCars() {
		fetch('/api/cars')
			.then(response => response.json())
			.then(json => this.setState({cars: json, loaded: true}))
			.catch(error => console.log(error));
	}

	componentDidMount() {
		this.loadCars();
	}

	render() {
		const cars = (this.state.cars && this.state.cars.slice()) || [];

		return (
			<div className="row-wrapper">
				<Loader loaded={this.state.loaded}>
					{cars.map((row, index) =>
						<CardRow key={index} cars={row.cols} />
					)}
				</Loader>
			</div>
		);
	}
}
