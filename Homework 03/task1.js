'use strict';

let lsModule = (function Module() {
	let storage = localStorage;

	return {
		get: (key) => {
			let value = storage[key];
			return value ? JSON.parse(storage[key]) : null;
		},

		getAll: () => {
			let all = [];

			for (let key in storage) {
				let obj = {};
				obj[key] = JSON.parse(storage[key]);
				all.push(obj);
			}

			return all;
		},

		set: (key, value) => {
			if ((key || key === 0) && value !== undefined) {
				storage[key] = JSON.stringify(value);
			}
		},

		add: (objArray) => {
			if (Array.isArray(objArray)) {
				for (let obj of objArray) {
					if (obj instanceof Object) {
						for (let prop in obj) {
							storage[prop] = JSON.stringify(obj[prop]);
						}
					}
				}
			}
		},

		remove: (key) => {
			storage.removeItem(key);
		},

		clear: () => {
			storage.clear();
		}
	};
})();

function task1() {
	alert('Добавляем запись "hello": "Hello world!"');
	lsModule.set('hello', 'Hello world!');
	alert('Теперь попробуем достать её: ' + lsModule.get('hello'));

	let objArray = [{author: 'Alex'}, {film: {name: 'Пекло', year: 2007}}];
	alert('Добавим массив из объектов: [{author: "Alex"}, {film: {name: "Пекло", year: 2007}}]');
	lsModule.add(objArray);
	alert('Получим все объекты: ' + lsModule.getAll());
	
	alert('Теперь удалим первый добавленный объект с ключом "hello"');
	lsModule.remove('hello');
	alert('Его больше нет: ' + lsModule.get('hello'));

	alert('Наконец, очистим localStorage');
	lsModule.clear();
	alert('Пусто: ' + lsModule.getAll());
}
