import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../style/Card.css'

export default class Card extends Component {
	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();

		const car = this.props.car;
		const id = car._id || '';
		if (id)
			this.context.router.history.push(`/car/${id}`);
	}

	render() {
		const car = this.props.car;
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
			<div className="card btn" onClick={(e) => this.handleClick(e)}>
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
}

Card.contextTypes = {
	router: PropTypes.object.isRequired
};
