import React from 'react'

import '../style/FoundCarCard.css'

export default function FoundCarCard(props) {
	const car = props.car;

	return (
		<div className="car-sr" onClick={() => props.onClick(car._id)}>
			<div className="car-sr-card">
				<img src={car.image} width="150px" alt="" />
				<div className="car-sr-info">
					<p className="car-name">{car.brand} {car.name} <span>${car.cost}</span></p>
					<p className="car-sr-inf">
						{car.year}, {car.mileage} км,
						{car.fuelType}, {car.engineCapacity} см<sup>3</sup>,
						 {car.transmission}
					</p>
				</div>
				<div style={{clear: "both"}}></div>
			</div>
		</div>
	);
}
