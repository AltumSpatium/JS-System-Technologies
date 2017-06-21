import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Tr, Td, Thead, Th } from 'reactable'
import Loader from 'react-loader'

import '../style/Admin.css'

export default class Admin extends Component {
	constructor() {
		super();
		this.state = {
			cars: null,
			loaded: false
		};

		this.addCar = this.addCar.bind(this);
		this.editCar = this.editCar.bind(this);
		this.deleteCar = this.deleteCar.bind(this);
	}

	componentDidMount() {
		this.loadCars();
	}

	loadCars() {
		fetch('/api/admin')
			.then(response => response.json())
			.then(json => this.setState({cars: json, loaded: true}))
			.catch(error => console.log(error));
	}

	addCar() {
		this.context.router.history.push('/admin/add');
	}

	editCar(id) {
		this.context.router.history.push(`/admin/edit/${id}`);
	}

	deleteCar(id, index) {
		fetch(`/api/car/${id}`, {
			method: 'DELETE'
		})
		.then(response => {
			if (response.status === 200) {
				const cars = this.state.cars.slice();
				cars.splice(index, 1);
				this.setState({cars: cars});
			}
		})
		.catch(error => console.log(error));
	}

	render() {
		const cars = (this.state.cars && this.state.cars.slice()) || [];

		return (
			<div className="car-table">
				<button className="btn-add"
						onClick={() => this.addCar()}>Добавить</button>
				<Loader loaded={this.state.loaded}>
					<Table className="table" itemsPerPage={5} previousPageLabel="&#8592;" nextPageLabel="&#8594;">
						<Thead>
							<Th column="_id" className="no-border" alt="" style={{display: 'none'}}></Th>
							<Th column="image">Изображение</Th>
							<Th column="name">Модель</Th>
							<Th column="brand">Марка</Th>
							<Th column="year">Год</Th>
							<Th column="mileage">Пробег</Th>
							<Th column="fuelType">Тип топлива</Th>
							<Th column="engineCapacity">Объем двигателя</Th>
							<Th column="transmission">Трансмиссия</Th>
							<Th column="cost">Стоимость</Th>
							<Th column="" className="no-border"></Th>
						</Thead>
						{cars.map((car, index) => {
							return (
								<Tr key={car._id} className="tr">
									<Td column="_id" className="no-border" style={{display: 'none'}}>
										{car._id}
									</Td>
									<Td column="image">
										<img src={car.image} width="100" height="70" alt="" />
									</Td>
									<Td column="name">{car.name}</Td>
									<Td column="brand">{car.brand}</Td>
									<Td column="year">{car.year}</Td>
									<Td column="mileage">{car.mileage}</Td>
									<Td column="fuelType">{car.fuelType}</Td>
									<Td column="engineCapacity">{car.engineCapacity}</Td>
									<Td column="transmission">{car.transmission}</Td>
									<Td column="cost">{'$' + car.cost}</Td>
									<Td column="" className="no-border">
										<div className="btns">
											<button onClick={() => this.editCar(car._id)}>Изменить</button>
											<button onClick={() => this.deleteCar(car._id, index)}>Удалить</button>
										</div>
									</Td>
								</Tr>
							);
						})}
					</Table>
				</Loader>
			</div>
		);
	}
}

Admin.contextTypes = {
	router: PropTypes.object.isRequired
};
