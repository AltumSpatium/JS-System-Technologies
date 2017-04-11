'use strict';

class Kingdom {
	constructor(description) {
		this._kingdomName = description.kingdomName;
		this._isAutotroph = description.isAutotroph;
		this._isUnicellular = description.isUnicellular;
	}

	getKingdom() {
		return this._kingdomName;
	}

	getInfo() {
		let info = 'Царство: ' + this.getKingdom() + '\n';
		info += 'Категория: ' + (this._isUnicellular ? 'одноклеточные' : 'многоклеточные') + '\n';
		info += 'Способ питания: ' + (this._isAutotroph ? 'автотрофный' : 'гетеротрофный') + '\n';
		return info;
	}
}

class Class extends Kingdom {
	constructor(description) {
		super(description);

		this._className = description.className;
	}

	getClass() {
		return this._className;
	}

	getInfo() {
		let info = 'Класс: ' + this.getClass() + '\n';
		info += super.getInfo();
		return info;
	}
}

class Species extends Class {
	constructor(description) {
		super(description);

		this._speciesName = description.speciesName;
		this._lifespan = description.lifespan > 0 ? description.lifespan : 1;
		this._habitat = description.habitat;
		this._isCarnivorous = description.isCarnivorous;
	}

	getSpecies() {
		return this._speciesName;
	}

	setlifespan(newLifespan) {
		this._lifespan = newLifespan > 0 ? newLifespan : 1;
	}

	getLifespan() {
		return this._lifespan;
	}

	getInfo() {
		let info = 'Вид: ' + this.getSpecies() + '\n';
		info += super.getInfo();
		info += 'Продолжительность жизни: ' + this.getLifespan() + 
			(this.getLifespan() % 10 < 5 && this.getLifespan() % 10 > 0 ? 'г.' : 'л.') + '\n';
		info += 'Ареал: ' + this._habitat + '\n';
		info += 'Отряд: ' + (this._isCarnivorous ? 'Плотоядные' : 'Травоядные') + '\n';
		return info;
	}
}

function task3() {
	let butterfly = new Species({kingdomName: 'Животные', isAutotroph: false,
		isUnicellular: false, className: 'Насекомые', speciesName: 'Бабочка-капустница',
		lifespan: 1, habitat: 'Восточная Европа, Северная Африка', isCarnivorous: false});
	alert(butterfly.getInfo());
}
