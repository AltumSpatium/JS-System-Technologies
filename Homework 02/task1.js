"use strict";

function filterUniqueObj(objArray, filterArray) {
	let checkedObjects = [];

	return objArray.filter(function(item) {
		let objStr = "";

		for (let filterProperty of filterArray) {
			objStr += filterProperty + item[filterProperty];
		}

		if (checkedObjects.indexOf(objStr) !== -1) {
			return false;
		} else {
			checkedObjects.push(objStr);
			return true;
		}
	});
}

function addStringRepresentation(objArray) {
	for (let obj of objArray) {
		obj.toString = () => {
			let str = '{';
			for (let prop in obj) {
				if (typeof obj[prop] !== 'function') {
					str += prop + ': ' + obj[prop] + ', ';
				}
			}
			return str === '{' ? str + '}' : str.slice(0, -2) + '}';
		}
	}
}

function task1() {
	//let objArray = [{a: 1, b: 1, c: 1}, {a: 1, b: 1}, {a: 2}, {a: 1, b: 2}];
	let objArray = [{a: 1}, {b: 1}, {a: 2}, {}, {a: 1, b: 2}, {c: 1}, {a: 1, b: 1}];
	addStringRepresentation(objArray);
	alert(filterUniqueObj(objArray, ['a']));
	alert(filterUniqueObj(objArray, ['b']));
	alert(filterUniqueObj(objArray, ['c']));
	alert(filterUniqueObj(objArray, ['a', 'b']));
	//alert(filterUniqueObj(objArray, ['f']));
}
