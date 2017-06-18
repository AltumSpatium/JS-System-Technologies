import React, { Component } from 'react'
import '../style/SearchField.css'

export default class SearchField extends Component {
	render() {
		return (
			<div>
				<div className="search-input">
					<p><span>Поиск: </span> <input />
					<button>Искать</button></p>
				</div>
			</div>
		);
	}
}
