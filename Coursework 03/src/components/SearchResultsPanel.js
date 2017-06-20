import React from 'react';
import Loader from 'react-loader'
import FoundCarCard from './FoundCarCard'

import '../style/SearchResultsPanel.css'

export default function SearchResultsPanel(props) {
	return (
		<div className="panel panel-primary">
			<div className="panel-heading">
				Результаты поиска
			</div>
			<div className="panel-body sr-panel">
				<Loader loaded={props.loaded}>
					{props.loaded && props.cars.length === 0 ?
						<h3 className="not-found">Ничего не найдено</h3> :
						props.cars.map(car => <FoundCarCard key={car._id} car={car} onClick={id => props.onClick(id)} />)}
				</Loader>
			</div>
		</div>
	);
}
