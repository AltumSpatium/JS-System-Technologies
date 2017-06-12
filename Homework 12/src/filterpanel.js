import React from 'react';
import FilterField from './filterfield'
import FilterFieldRange from './filterfieldrange'

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
					<FilterField value={values.brand} onChange={(e) => onChange(e)}
						name="brand" labelText="Марка:"/>
					<FilterField value={values.model} onChange={(e) => onChange(e)} 
						name="model" labelText="Модель:"/>
					<FilterFieldRange value={{from: values.yearFrom, to: values.yearTo}} 
						onChange={(e) => onChange(e)} name={{from: 'yearFrom', to: 'yearTo'}}
						labelText="Год выпуска:"/>
					<FilterFieldRange value={{from: values.costFrom, to: values.costTo}} 
						onChange={(e) => onChange(e)} name={{from: 'costFrom', to: 'costTo'}}
						labelText="Стоимость:"/>
					<FilterFieldRange value={{from: values.mileageFrom, to: values.mileageTo}} 
						onChange={(e) => onChange(e)} name={{from: 'mileageFrom', to: 'mileageTo'}}
						labelText="Пробег:"/>
					<FilterFieldRange value={{from: values.capacityFrom, to: values.capacityTo}} 
						onChange={(e) => onChange(e)} name={{from: 'capacityFrom', to: 'capacityTo'}}
						labelText="Объём двигателя:"/>
					<label>Тип топлива:</label>
					<div className="row" style={{"textAlign": "center"}}>
						<div id="fuelTypeInput">
							<div className="form-group" style={{"textAlign": "left"}}>
								<input checked={values.fuelType === "Бензин" ? true : false} 
									onChange={onChange} id="fuelGasoline" type="radio" name="fuelType" 
									className="k-radio" value="Бензин" />
								<label htmlFor="fuelGasoline" className="k-radio-label"> Бензин</label>
								<input checked={values.fuelType === "Дизель" ? true : false} 
									onChange={onChange} id="fuelDiesel" type="radio" name="fuelType" 
									className="k-radio" value="Дизель" />
								<label htmlFor="fuelDiesel" className="k-radio-label"> Дизель</label>
								<input checked={values.fuelType === "Электро" ? true : false} 
									onChange={onChange} id="fuelElectro" type="radio" name="fuelType" 
									className="k-radio" value="Электро" />
								<label htmlFor="fuelElectro" className="k-radio-label"> Электро</label>
							</div>
						</div>
					</div>
					<label>Трансмиссия:</label>
					<div className="row" style={{"textAlign": "center"}}>
						<div id="transmissionInput">
							<div className="form-group">
								<input checked={values.transmission === "Механика" ? true : false} 
									onChange={onChange} id="trMech" type="radio" name="transmission" 
									className="k-radio" value="Механика" />
								<label htmlFor="trMech" className="k-radio-label"> Механика</label>

								<input checked={values.transmission === "Автомат" ? true : false} 
									onChange={onChange}  id="trAuto" type="radio" name="transmission" 
									className="k-radio" value="Автомат" />
								<label htmlFor="trAuto" className="k-radio-label"> Автомат</label>
							</div>
						</div>
					</div>
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
