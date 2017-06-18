import React, { Component } from 'react'
import Card from './Card'
import '../style/CardRow.css'

export default class CardRow extends Component {
	renderCard(car) {
		return <Card car={car}/>;
	}

	render() {
		const cars = this.props.cars;
		return (
			<div className="card-wrapper">
				<div>
					{this.renderCard(cars[0])}
					{this.renderCard(cars[1])}
					{this.renderCard(cars[2])}
					{this.renderCard(cars[3])}
					{this.renderCard(cars[4])}
					<div style={{clear: 'both'}}></div>
				</div>
			</div>
		);
	}
}
