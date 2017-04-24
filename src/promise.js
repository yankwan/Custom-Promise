var CPromise = (function() {

	const PENDING = 0,
		  RESOLVED = 1,
		  REJECTED = 2;

	function CPromise(executor) {
		var self = this;
	  	self.status = PENDING; 
		self.data = undefined;  
		self.onResolvedCallback = [];
		self.onRejectedCallback = [];

		function resolve(value) {
			if (self.status === PENDING) {
				self.status = RESOLVED;
				self.data = value;
				for (var i = 0; i < self.onResolvedCallback.length; i++)
					self.onResolvedCallback[i](value);
			}
		}

		function reject(reason) {
			if (self.status === PENDING) {
				self.status = REJECTED;
				self.data = reason;
				for (var i = 0; i < self.onRejectedCallback.length; i++)
					self.onRejectedCallback[i](reason);
			}			
		}

	  	try { 
	    	executor(resolve, reject);
		} catch(e) {
			reject(e);
		}
	}

	CPromise.prototype.then = function(onResolved, onRejected) {
		var self = this;

		onResolved = typeof onResolved === 'function' ? onResolved : function(value) {};
		onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {};

		if (self.status === RESOLVED) {
			return new CPromise(function(resolve, reject) {
				try {
					var x = onResolved(self.data);
					if (x instanceof CPromise) {
						x.then(resolve, reject);
					}

					resolve(x);
				} catch (e) {
					reject(e);
				}
			})
		}

		if (self.status === REJECTED) {
			return new CPromise(function(resolve, reject) {
				try {
					var x = onRejected(self.data);
					if (x instanceof CPromise) {
						x.then(resolve, reject);
					}

				} catch (e) {
					reject(e);
				}
			})
		}

		if (self.status === PENDING) {
			return new CPromise(function(resolve, reject) {
				self.onResolvedCallback.push(function(value) {
					try {
						var x = onResolved(self.data);
						if (x instanceof CPromise) {
							x.then(resolve, reject);
						}
					} catch (e) {
						reject(e);
					}
				})

				self.onRejectedCallback.push(function(reason) {
					try {
						var x = onRejected(self.data);
						if (x instanceof CPromise) {
							x.then(resolve, reject);
						}

					} catch (e) {
						reject(e);
					}
				})

			})
		}
	}



	module.exports = CPromise;
})()