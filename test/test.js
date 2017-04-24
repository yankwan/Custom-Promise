var CPromise = require('../src/promise');

var cp = new CPromise(function(resolve, reject) {
	resolve(3);
});

console.log(cp);