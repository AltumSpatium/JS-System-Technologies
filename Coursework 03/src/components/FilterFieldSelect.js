import React from 'react';
import Select from 'react-select'

import 'react-select/dist/react-select.css'
import '../style/FilterFieldSelect.css'

export default function FilterFieldSelect(props) {
	return (
		<div>
			<label>{props.labelText}</label>
			<div className="row">
				<Select
					placeholder={props.placeholder}
					name={props.name}
					value={props.value}
					options={props.options.map(option => ({value: option, label: option}))}
					onChange={e => props.onChange(
						{ target: {name: props.name, value: e ? e.value : null} })}>
				</Select>
			</div>
		</div>
	);
}
