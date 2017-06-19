import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import 'react-select/dist/react-select.css'
import '../style/CarForm.css'

export default class CarForm extends Component {
	constructor() {
		super();
		this.state = {
			isEditing: false,
			car: null
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.execQuery = this.execQuery.bind(this);
	}

	loadCar(id) {
		const urlToFile = (url, filename, mimeType) => {
			return (fetch(url)
					.then(response => response.arrayBuffer())
					.then(buf => new File([buf], filename, {type: mimeType}))
			);
		};

		fetch(`/api/car/${id}`)
			.then(response => response.json())
			.then(json => {
				const car = Object.assign({}, json);
				urlToFile(car.image, 'file.jpeg', 'image/jpeg')
					.then(file => {
						// TODO add loading to input of type file
						document.getElementById('imageFile').files[0] = file;
						this.setState({car: car, isEditing: true});
					});
			})
			.catch(error => { console.log(error) });
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (id) this.loadCar(id);
	}

	handleChange(e) {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		const car = Object.assign({}, this.state.car, {[name]: value});
		this.setState({car: car});
	}

	handleClick(e) {
		e.preventDefault();

		const car = this.state.car;
		const image = document.getElementById('imageFile').files[0];
		if (!image || !car) return;

		let fileReader = new FileReader();

		fileReader.onloadend = (e) => {
			let data = e.target.result;
			car.image = data;

			if (!this.state.isEditing)
				this.execQuery('/api/cars', 'POST', car);
			else
				this.execQuery(`/api/car/${car._id}`, 'UPDATE', car);
		}

		fileReader.readAsDataURL(image);
	}

	execQuery(url, method, data) {
		fetch(url, {
			method: method,
			headers: {  
      			"Content-type": "application/json; charset=UTF-8"
    		},  
			body: JSON.stringify(data)
		}).catch(error => console.log(error));
		this.context.router.history.push('/admin');
	}

	render() {
		const car = Object.assign({}, this.state.car);
		const title = this.state.isEditing ? 'Изменить' : 'Добавить';

		return (
			<div>
				<div className="container field">
					<div className="panel panel-primary">
						<div className="panel-heading">{title}</div>
						<div className="panel-body">
							<form id="carForm" name="carForm">
								<div className="form-group">
									<label htmlFor="name">Модель:</label>
									<input type="text" className="form-control" id="name"
										   name="name" value={car.name}
										   onChange={(e) => this.handleChange(e)} />
								</div>
								<div className="form-group">
									<label htmlFor="brand">Марка:</label>
									<input type="text" className="form-control" id="brand"
										   name="brand" value={car.brand}
										   onChange={(e) => this.handleChange(e)} />
								</div>
								<div className="form-group">
									<label htmlFor="year">Год выпуска:</label>
									<input type="number" className="form-control" id="year"
										   name="year" value={car.year}
										   onChange={(e) => this.handleChange(e)} />
								</div>
								<div className="form-group">
									<label htmlFor="cost">Стоимость:</label>
									<input type="number" className="form-control" id="cost" min="0"
										   name="cost" value={car.cost}
										   onChange={(e) => this.handleChange(e)} />
								</div>
								<div className="form-group">
									<label htmlFor="mileage">Пробег:</label>
									<input type="number" className="form-control" id="mileage" min="0"
										   name="mileage" value={car.mileage}
										   onChange={(e) => this.handleChange(e)} />
								</div>
								<div className="form-group">
									<label htmlFor="capacity">Объем двигателя:</label>
									<input type="number" className="form-control" id="capacity" min="0"
										   name="engineCapacity" value={car.engineCapacity}
										   onChange={(e) => this.handleChange(e)} />
								</div>
								<div className="form-group">
									<Select
										placeholder="Выберите тип топлива..."
										name="fuelType"
										value={car.fuelType}
										options={[
											{ value: 'Бензин', label: 'Бензин'},
											{ value: 'Дизель', label: 'Дизель'},
											{ value: 'Электро', label: 'Электро'}
										]}
										onChange={(e) => this.handleChange(
											{ target: {name: 'fuelType', value: e ? e.value : null} }
										)}>
									</Select>
								</div>
								<div className="form-group">
									<Select
										placeholder="Выберите тип трансмиссии..."
										name="transmission"
										value={car.transmission}
										options={[
											{ value: 'Автомат', label: 'Автомат'},
											{ value: 'Механика', label: 'Механика'},
										]}
										onChange={(e) => this.handleChange(
											{ target: {name: 'transmission', value: e ? e.value : null} }
										)}>
									</Select>
								</div>
								<div className="form-group">
									<label className="btn btn-default btn-file">
										Выбрать фото <input id="imageFile" type="file" style={{display: "none"}}
															name="image"
															onChange={(e) => this.handleChange(e)} />
									</label>
								</div>
								<div className="container btn-container">
									<Link to="/admin" className="btn btn-warning">Отмена</Link>
									<button
										className="btn btn-success"
										onClick={(e) => this.handleClick(e)}>
										{title}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);	
	}
}

CarForm.contextTypes = {
	router: PropTypes.object.isRequired
};
