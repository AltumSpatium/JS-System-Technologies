import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SearchResultsPanel from './SearchResultsPanel'
import FilterPanel from './FilterPanel'
import queryString from 'query-string'

import '../style/SearchPage.css'

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
			cars: [],
			loaded: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.loadCars = this.loadCars.bind(this);
	}

	componentDidMount() {
		const searchText = this.props.match.params.text;
		const queryParams = this.props.location.search;
		this.loadCars(this.buildQuery(searchText, queryParams));
	}

	loadCars(url) {
		fetch(url)
			.then(response => response.json())
			.then(json => {
				this.setState(
					Object.assign({cars: json, loaded: true}, queryString.parse(this.props.location.search))
				);
			});
	}

	buildQuery(text, params) {
		text = text || '';
		const filterParams = queryString.parse(params);
		const query = text && filterParams.brand ? '' : text;
		return `/api/search/${query}${params}`;
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleClick(id) {
		this.context.router.history.push(`/car/${id}`);
	}

	handleFilter(e) {
		e.preventDefault();
		
		const searchText = this.props.match.params.text || '';
		const queryParams = {};
		Object.keys(this.state).forEach(key => {
			if (this.state[key] && key !== 'loaded' && key !== 'cars')
				queryParams[key] = this.state[key]
		});
		const query = queryString.stringify(queryParams);

		this.context.router.history.push(`/search/${searchText}?${query}`);
		this.setState({loaded: false});
		this.loadCars(`/api/search/${searchText}?${query}`);
	}

	render() {
		const cars = this.state.cars.slice();

		return (
			<div className="container search-container">
				<div className="row">
					<div className="col-lg-8">
						<SearchResultsPanel cars={cars} onClick={id => this.handleClick(id)} loaded={this.state.loaded} />
					</div>
					<div className="col-md-4">
						<FilterPanel values={this.state} onChange={e => this.handleChange(e)}
							onFilterClick={e => this.handleFilter(e)}/>
					</div>
				</div>
			</div>
		);
	}
}

SearchPage.contextTypes = {
	router: PropTypes.object.isRequired
};
