module.exports = function chunkify(array, chuckSize) {
	let arr = array.slice();
	let chunkedArray = [];

	while (arr.length)
		chunkedArray.push({cols: arr.splice(0, chuckSize)});

	return chunkedArray;
};
