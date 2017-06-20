import React from 'react';

export default function FilterFieldRange(props) {
	const onChange = props.onChange;

	return (
		<div>
			<label>{props.labelText}</label>
			<div className="row" style={{"textAlign": "center"}}>
				<div className="form-group">
					<div className="input-group">
						<input value={props.value.from}
							onChange={onChange} name={props.name.from}
							placeholder="От..." style={{"width": "105px"}} />
					</div>
					<div className="input-group">
						<input value={props.value.to}
							onChange={onChange} name={props.name.to}
							placeholder="До..." style={{"width": "105px"}} />
					</div>
				</div>
			</div>
		</div>
	);
}
