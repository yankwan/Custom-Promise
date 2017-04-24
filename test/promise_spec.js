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

	it('test then chain transmit', function() {
		cp.then()
			.catch()
			.then()
			.then(function(value) {
				expect(value).toBe(10);
			})
	})


	it('test throw error catch throw reject function', function() {
		cp.then(function(result) {
			CPromise.reject('Rejected');
		}).catch(function() {
			expect(cp).toThrow();
		})
	})

	it('test async', function() {
		var cp = new CPromise(function(resolev, reject) {
			setTimeout(function() {
				resolev('Success');
			}, 1500);
		});

		var result;

		cp.then(function(value) {
			result = value;
		});

		setTimeout(function() {
			expect(result).toBe('Success');
			done();
		});

	});
})