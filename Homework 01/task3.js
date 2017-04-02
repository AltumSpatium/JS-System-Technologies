"use strict"

function inputNumber(message) {
	while (true) {
		let userInput = prompt(message);
		if (userInput === null) throw 'exit';

		if (userInput && !isNaN(Number(userInput))) {
			return Number(userInput);
		}
		alert('Incorrect input, try again!')
	}
}

function task3() {
	let enteredNumber = inputNumber('Enter a number');
	let number = Number(enteredNumber.toString().replace('.', ''));
	let digitCounter = (num) => num === 0 ? num : num % 10 + digitCounter(Math.floor(num / 10));
	alert('Sum of digits of ' + enteredNumber + ' is ' + digitCounter(number));
}
