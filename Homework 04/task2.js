'use strict';

function Kingdom(description) {
	this._kingdomName = description.kingdomName;
	this._isAutotroph = description.isAutotroph;
	this._isUnicellular = description.isUnicellular;
}

Kingdom.prototype.getKingdom = function() {
	return this._kingdomName;
}

Kingdom.prototype.getInfo = function() {
	let info = 'Царство: ' + this.getKingdom() + '\n';
	info += 'Категория: ' + (this._isUnicellular ? 'одноклеточные' : 'многоклеточные') + '\n';
	info += 'Способ питания: ' + (this._isAutotroph ? 'автотрофный' : 'гетеротрофный') + '\n';
	return info;
}

function Class(description) {
	Kingdom.apply(this, arguments);

	this._className = description.className;
}

Class.prototype = Object.create(Kingdom.prototype);
Class.prototype.constructor = Class;

Class.prototype.getClass = function() {
	return this._className;
}

Class.prototype.getInfo = function() {
	let info = 'Класс: ' + this.getClass() + '\n';
	info += Kingdom.prototype.getInfo.call(this);
	return info;
}

function Species(description) {
	Class.apply(this, arguments);

	this._speciesName = description.speciesName;
	this._lifespan = description.lifespan > 0 ? description.lifespan : 1;
	this._habitat = description.habitat;
	this._isCarnivorous = description.isCarnivorous;
}

Species.prototype = Object.create(Class.prototype);
Species.prototype.constructor = Species;

Species.prototype.getSpecies = function() {
	return this._speciesName;
}

Species.prototype.setLifespan = function(newLifespan) {
	this._lifespan = newLifespan > 0 ? newLifespan : 1;
}

Species.prototype.getLifespan = function() {
	return this._lifespan;
}

Species.prototype.getInfo = function() {
	let info = 'Вид: ' + this.getSpecies() + '\n';
	info += Class.prototype.getInfo.call(this);
	info += 'Продолжительность жизни: ' + this.getLifespan() + 
		(this.getLifespan() % 10 < 5 && this.getLifespan() % 10 > 0 ? 'г.' : 'л.') + '\n';
	info += 'Ареал: ' + this._habitat + '\n';
	info += 'Отряд: ' + (this._isCarnivorous ? 'Плотоядные' : 'Травоядные') + '\n';
	return info;
}

function task2() {
	let butterfly = new Species({kingdomName: 'Животные', isAutotroph: false,
		isUnicellular: false, className: 'Насекомые', speciesName: 'Бабочка-капустница',
		lifespan: 1, habitat: 'Восточная Европа, Северная Африка', isCarnivorous: false});
	alert(butterfly.getInfo());
}
