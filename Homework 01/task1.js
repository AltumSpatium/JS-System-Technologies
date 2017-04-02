"use strict"

function input(params) {
	let userInput;
	let getInput = params.isQuestion ? confirm : prompt;
	while (true) {
		userInput = getInput(params.message);
		if (userInput === null) throw 'exit';
		
		if (params.isQuestion || userInput.search(params.pattern) != -1) {
			if (params.limitation) {
				if (params.limitation(userInput)) {
					return userInput;
				}
			} else {
				return userInput;
			}
		}
		alert('Неправильный ввод, попробуйте ещё раз!');
	}
}

function task1() {
	let stringPattern = /^[a-zA-Zа-яА-Я\-]+$/;
	let numberPattern = /^\d+$/;
	let genderPattern = /^[мж]{1}$/i;

	let surname = input({message: 'Введите вашу фамилию', pattern: stringPattern});
	let name = input({message: 'Введите ваше имя', pattern: stringPattern});
	let patronymic = input({message: 'Введите ваше отчество', pattern: stringPattern});
	let age = input({message: 'Введите ваш возраст', pattern: numberPattern,
					 isQuestion: false, limitation: (num) => num >= 0 && num <= 150});
	let gender = input({message: 'Введите ваш пол (М/Ж)',
		pattern: genderPattern}).toLowerCase() === 'м' ? 'Мужской' : 'Женский';
	let university = input({message: 'Введите название вашего университета', pattern: stringPattern});
	let course = input({message: 'Введите ваш курс', pattern: numberPattern,
		isQuestion: false, limitation: (num) => num >= 1 && num <= 5});
	let debts = input({message: 'Есть ли у вас долги по учёбе?', pattern: null,
		isQuestion: true}) ? 'Есть' : 'Нет';

	let pattern = `${surname} ${name} ${patronymic}
		Возраст: ${age}
		Пол: ${gender}
		Университет: ${university}, ${course} курс
		Долги: ${debts}`;

	alert(pattern);
}
