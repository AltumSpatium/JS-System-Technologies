import React from 'react';

export default function FilterField(props) {
	return (
		<div>
			<label>{props.labelText}</label>
			<div className="row" style={{"textAlign": "center"}}>
				<input value={props.value} onChange={props.onChange} name={props.name} />
			</div>
		</div>
	);
}
