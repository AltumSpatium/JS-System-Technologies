import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/SearchField.css'

export default class SearchField extends Component {
	constructor() {
		super();
		this.state = {
			search: ''
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick(e) {
		e.preventDefault();

		const searchText = this.state.search;
		this.context.router.history.push(`/search/${searchText}`);
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div>
				<div className="search-input">
					<p><span>Поиск: </span> <input 
												value={this.state.search}
												name='search'
												onChange={(e) => this.handleChange(e)} />
					<button onClick={(e) => this.handleClick(e)}>Искать</button></p>
				</div>
			</div>
		);
	}
}

SearchField.contextTypes = {
	router: PropTypes.object.isRequired
};
