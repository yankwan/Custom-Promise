var CPromise = require('../src/promise');

var cp = new CPromise(function(resolve, reject) {
	setTimeout(function() {
		reject(new Error("Error"));
	}, 1000);

	// reject(new Error("Error"));
});

cp.then(function(result) {
	// return result * 2;
	console.log("Yay!" + result);
}).catch(function(reason) {
	console.log("Ohoo!" + reason);
})

console.log(cp);

var p = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('Success');
	}, 1000);
});

p.then(function(result) {
	console.log("Yay!" + result);
})

console.log(p);


