import React from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import '../style/FilterFieldRange.css'

export default function FilterFieldRange(props) {
	const createSliderWithTooltip = Slider.createSliderWithTooltip;
	const Range = createSliderWithTooltip(Slider.Range);

	const value = props.value;
	const name = props.name;
	const onAfterChange = e => {
		const [valueFrom, valueTo] = e;

		props.onChange({
			target: {
				name: name.from,
				value: valueFrom
			}
		});
		props.onChange({
			target: {
				name: name.to,
				value: valueTo
			}
		});
	}

	const min = props.min || 0;
	const max = props.max || 0;
	const tooltipStyle = props.tooltipStyle || '';

	return (
		<div>
			<label>{props.labelText}</label>
			<div className="row" style={{"textAlign": "center"}}>
				<Range min={min} max={max}
					defaultValue={[parseInt(value.from) || 0, parseInt(value.to) || 0]}
					onAfterChange={e => onAfterChange(e)}
					tipFormatter={value => `${value}${tooltipStyle}`}
					marks={{[min]: min, [max]: max}} />
			</div>
		</div>
	);
}
