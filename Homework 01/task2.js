'use strict';

function squareEquation(a, b, c) {
	if (!arguments.length) {
		alert('No coefficients provided!');
		return null;
	} else if (!a) {
		alert('Coefficient "a" can\'t equals zero!');
		if (confirm('Do you want to solve linear equation?')) {
			if (!b) {
				alert('Infinite number of roots!');
				return null;
			}
			let result = -c / b;
			return 'x = ' + result;
		}
		return null;
	} else if (!b && !c) {
		return 'x = 0';
	}

	let discriminant = b ** 2 - 4 * a * c;
	let calcRoot = (sqrtDiscriminant) => (-b + sqrtDiscriminant) / (2 * a);

	if (discriminant > 0) {
		let root1 = calcRoot(Math.sqrt(discriminant));
		let root2 = calcRoot(-Math.sqrt(discriminant));
		return 'x1 = ' + root1 + ', x2 = ' + root2;
	} else if (discriminant === 0) {
		let root = calcRoot(0);
		return 'x = ' + root;
	}

	alert('The equation has no real roots!');
	return null;
}

function inputNumber(message) {
	while (true) {
		let userInput = prompt(message);
		alert(userInput);
		if (userInput === null) throw 'exit';

		if (userInput && !isNaN(Number(userInput))) {
			return Number(userInput);
		}
		alert('Incorrect input, try again!')
	}
}

function task2() {
	let a = inputNumber('Enter coefficient a');
	let b = inputNumber('Enter coefficient b');
	let c = inputNumber('Enter coefficient c');

	let answer = squareEquation(a, b, c);
	if (answer) {
		alert(answer);
	}
}

function printTest(equation, ...coefficients) {
	alert('Square equation: ' + equation);
	let answer = squareEquation(...coefficients);
	if (answer) {
		alert(answer);
	}
}

function tests() {
	printTest('x^2 + x - 6 = 0', 1, 1, -6);
	printTest('x^2 - x + 3 = 0', 1, -1, 3);
	printTest('16x^2 - 40x + 25 = 0', 16, -40, 25);
}
