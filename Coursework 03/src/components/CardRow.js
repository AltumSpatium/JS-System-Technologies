import React from 'react'
import Card from './Card'

import '../style/CardRow.css'

export default function CardRow(props) {
	const cars = props.cars;

	return (
		<div className="card-wrapper">
			<div>
				{cars.map((car, index) => 
					<Card key={index} car={car} />
				)}
				<div style={{clear: 'both'}}></div>
			</div>
		</div>
	);
}
