import React, { Component } from 'react';
import SearchResultsPanel from './searchresultspanel'
import FilterPanel from './filterpanel'

export default class SearchPage extends Component {
	constructor() {
		super();

		this.state = {
			brand: "",
			model: "",
			yearFrom: "",
			yearTo: "",
			costFrom: "",
			costTo: "",
			mileageFrom: "",
			mileageTo: "",
			capacityFrom: "",
			capacityTo: "",
			fuelType: "",
			transmission: "",
			cars: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleFilter(e) {
		e.preventDefault();
		const {brand, model, yearFrom, yearTo, costFrom, costTo,
			mileageFrom, mileageTo, capacityFrom, capacityTo, fuelType, transmission} = this.state;

		let pattern = `${brand} ${model}
			Год: ${yearFrom} - ${yearTo}
			Цена: ${costFrom}$ - ${costTo}$
			Пробег: ${mileageFrom} - ${mileageTo} км
			Объем двигателя: ${capacityFrom} - ${capacityTo} см^3
			Тип топлива: ${fuelType}
			Трансмиссия: ${transmission}`

		alert(pattern);
	}

	render() {
		const values = Object.assign({}, this.state);

		return (
			<div className="container search-container">
				<div className="row">
					<div className="col-lg-8">
						<SearchResultsPanel />
					</div>
					<div className="col-md-4">
						<FilterPanel values={values} onChange={(e) => this.handleChange(e)}
							onFilterClick={(e) => this.handleFilter(e)}/>
					</div>
				</div>
			</div>
		);
	}
}
