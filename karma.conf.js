module.exports = function(config) {
	config.set({
		frameworks: ['browserify','jasmine'],
		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			'src/**/*.js',
			'test/**/*_spec.js'
		],
		preprocessors: {
			'test/**/*.js': ['babel','jshint','browserify'],
			'src/**/*.js': ['babel','jshint', 'browserify']
		},

		babelPreprocessor: {
			options: {
				sourceMap: 'inline',
				retainLines: true // NEW LINE
			}
		},

		browsers: ['PhantomJS'],
		browserify: {
			debug: true
		}
	})
}