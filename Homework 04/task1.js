"use strict";

function Kingdom(description) {
	let kingdomName = description.kingdomName;
	this._isAutotroph = description.isAutotroph;
	this._isUnicellular = description.isUnicellular;

	this.getKingdom = function() {
		return kingdomName;
	};

	this.getInfo = function() {
		let info = 'Царство: ' + this.getKingdom() + '\n';
		info += 'Категория: ' + (this._isUnicellular ? 'одноклеточные' : 'многоклеточные') + '\n';
		info += 'Способ питания: ' + (this._isAutotroph ? 'автотрофный' : 'гетеротрофный') + '\n';
		return info;
	};
}

function Class(description) {
	Kingdom.apply(this, arguments);

	let className = description.className;

	this.getClass = function() {
		return className;
	};

	let parentGetInfo = this.getInfo;
	this.getInfo = function() {
		let info = 'Класс: ' + this.getClass() + '\n';
		info += parentGetInfo.call(this);
		return info;
	};
}

function Species(description) {
	Class.apply(this, arguments);

	let speciesName = description.speciesName;
	let lifespan = description.lifespan > 0 ? description.lifespan : 1;
	this._habitat = description.habitat;
	this._isCarnivorous = description.isCarnivorous;


	this.getSpecies = function() {
		return speciesName;
	};

	this.setLifespan = function(newLifespan) {
		lifespan = newLifespan > 0 ? newLifespan : 1;
	};

	this.getLifespan = function() {
		return lifespan;
	};

	let parentGetInfo = this.getInfo;
	this.getInfo = function() {
		let info = 'Вид: ' + this.getSpecies() + '\n';
		info += parentGetInfo.call(this);
		info += 'Продолжительность жизни: ' + this.getLifespan() + 
			(this.getLifespan() % 10 < 5 && this.getLifespan() % 10 > 0 ? 'г.' : 'л.') + '\n';
		info += 'Ареал: ' + this._habitat + '\n';
		info += 'Отряд: ' + (this._isCarnivorous ? 'Плотоядные' : 'Травоядные') + '\n';
		return info;
	};
}

function task1() {
	let butterfly = new Species({kingdomName: 'Животные', isAutotroph: false,
		isUnicellular: false, className: 'Насекомые', speciesName: 'Бабочка-капустница',
		lifespan: 1, habitat: 'Восточная Европа, Северная Африка', isCarnivorous: false});
	alert(butterfly.getInfo());
}
