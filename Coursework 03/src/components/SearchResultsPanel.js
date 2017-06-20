import React from 'react';
import Loader from 'react-loader'
import FoundCarCard from './FoundCarCard'
import Infinite from 'react-infinite'

import '../style/SearchResultsPanel.css'

export default function SearchResultsPanel(props) {
	const notFound = props.loaded && props.cars.length === 0;
	return (
		<div className="panel panel-primary">
			<div className="panel-heading">
				Результаты поиска
			</div>
			<div className="panel-body sr-panel">
				<Loader loaded={props.loaded}>
					<Infinite 
						elementHeight={150}
                        containerHeight={notFound ? 90 : 612}>
						{notFound ? <h3 className="not-found">Ничего не найдено</h3> :
							props.cars.map(car => 
								<FoundCarCard key={car._id} car={car} onClick={id => props.onClick(id)} />
							)}
					</Infinite>
				</Loader>
			</div>
		</div>
	);
}
