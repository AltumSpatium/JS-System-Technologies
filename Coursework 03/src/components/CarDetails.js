import React, { Component } from 'react'
import NotFound from './NotFound'

import '../style/CarDetails.css'

export default class CarDetails extends Component {
	constructor() {
		super();
		this.state = {
			car: null,
			loaded: true
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id
		if (id) this.loadCar(id);
	}

	loadCar(id) {
		fetch(`/api/car/${id}`)
			.then(response => response.json())
			.then(json => this.setState({car: json}))
			.catch(error => this.setState({loaded: false, car: []}));
	}

	render() {
		const car = this.state.car;
		if (!car) return null;
		if (!this.state.loaded) return <NotFound />

		return (
			<div className="car-card">
				<div className="large-card">
					<img src={car.image} width="550px" height="395px" alt="" />
					<div className="car-info full-info">
						<p className="full-name">{car.brand} {car.name}</p>
						<div className="car-info-params">
							<p>Год выпуска</p>
							<hr/>
							<p>Пробег</p>
							<hr/>
							<p>Тип топлива</p>
							<hr/>
							<p>Объем двигателя</p>
							<hr/>
							<p>Трансмиссия</p>
							<hr/>
							<p>Стоимость</p>
						</div>
						<div className="car-info-values">
							<p>{car.year}</p>
							<hr/>
							<p>{car.mileage} км</p>
							<hr/>
							<p>{car.fuelType}</p>
							<hr/>
							<p>{car.engineCapacity} см<sup>3</sup></p>
							<hr/>
							<p>{car.transmission}</p>
							<hr/>
							<p>${car.cost}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
