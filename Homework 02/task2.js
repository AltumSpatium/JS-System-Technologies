'use strict';

function getThirdMin(array) {
	array = array.filter((value, index, arr) => arr.indexOf(value) === index);
	if (array.length < 3) {
		return null;
	}

	let [firstMin, secondMin, thirdMin] = array.slice(0, 3).sort();

	for (let elem of array.slice(3)) {
		if (elem < firstMin) {
			[thirdMin, secondMin, firstMin] = [secondMin, firstMin, elem];
		} else if (elem < secondMin) {
			[thirdMin, secondMin] = [secondMin, elem];
		} else if (elem < thirdMin) {
			thirdMin = elem;
		}
	}

	return thirdMin;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function task2() {
	let array = [];
	for (let i = 0; i < 100; i++) {
		array.push(getRandomInt(500, 1000));
	}

	let thirdMin = getThirdMin(array);
	alert(thirdMin);
}
