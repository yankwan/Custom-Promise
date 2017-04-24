var CPromise = require('../src/promise');

describe('CPromise', function() {

	var cp;

	beforeEach(function() {
		cp = new CPromise(function(resolve, reject) {
			resolev(10);
		});
	})

	it('test new CPromise', function() {

		expect(cp).toEqual(jasmine.any(CPromise));
	});


	it('test then function', function() {

		cp.then(function(result) {
			expect(result).toBe(10);
		});
	});

	it('test then function chain', function() {
		cp.then(function(result) {
			return result*2;
		}).then(function(result) {
			expect(result).toBe(20);
		});
	});

	it('test then function chain with return promise', function() {
		cp.then(function(result) {
			return new CPromise(function(resolve, reject) {
				resolve('This is resolved');
			});
		}).then(function(result) {
			expect(result).toBe('This is resolved');
		});
	});
})