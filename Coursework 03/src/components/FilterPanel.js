import React from 'react';
import FilterField from './FilterField'
import FilterFieldRange from './FilterFieldRange'
import FilterFieldSelect from './FilterFieldSelect'

import '../style/FilterPanel.css'

export default function FilterPanel(props) {
	const onChange = props.onChange;
	const onFilterClick = props.onFilterClick;
	const values = props.values;

	return (
		<div className="panel panel-primary">
			<div className="panel-heading">
				Фильтр
			</div>
			<div className="panel-body">
				<form action="" className="form-inline">
					<FilterField value={values.brand} onChange={e => onChange(e)}
						name="brand" labelText="Марка:" />
					<FilterField value={values.model} onChange={e => onChange(e)} 
						name="model" labelText="Модель:" />
					<FilterFieldRange value={{from: values.yearFrom, to: values.yearTo}} 
						onChange={e => onChange(e)} name={{from: 'yearFrom', to: 'yearTo'}}
						min={1950} max={2017} labelText="Год выпуска:" />
					<FilterFieldRange value={{from: values.costFrom, to: values.costTo}} 
						onChange={e => onChange(e)} name={{from: 'costFrom', to: 'costTo'}}
						min={0} max={80000} tooltipStyle="$" labelText="Стоимость:" />
					<FilterFieldRange value={{from: values.mileageFrom, to: values.mileageTo}} 
						onChange={e => onChange(e)} name={{from: 'mileageFrom', to: 'mileageTo'}}
						min={0} max={350000} tooltipStyle=" км" labelText="Пробег:" />
					<FilterFieldRange value={{from: values.capacityFrom, to: values.capacityTo}} 
						onChange={e => onChange(e)} name={{from: 'capacityFrom', to: 'capacityTo'}}
						min={0} max={45000} tooltipStyle=" см^3" labelText="Объём двигателя:" />
					<FilterFieldSelect value={values.fuelType} labelText="Тип топлива:"
						placeholder="Выберите тип топлива..." name="fuelType"
						options={['Бензин', 'Дизель', 'Электро']}
						onChange={e => onChange(e)} />
					<FilterFieldSelect value={values.transmission} labelText="Трансмиссия:"
						placeholder="Выберите тип трансмиссии..." name="transmission"
						options={['Автомат', 'Механика']}
						onChange={e => onChange(e)} />
					<div className="row" style={{"textAlign": "center"}}>
						<div id="btnFilter">
							<button onClick={onFilterClick}>Показать</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
