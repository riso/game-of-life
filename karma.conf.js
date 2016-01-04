var path = require('path');
var webpack = require("webpack");

var debug = global.process.argv.reduce(function(result, arg) {
	return arg.indexOf('debug') !== -1 || result;
}, false);

var include = [
	path.resolve('./lib')
];
var reporters = ['progress', 'junit'];

var preLoaders = [{
	test: /\.js$/,
	loader: 'babel',
	include: include,
	query: {
		presets: ['es2015']
	}
}];

var loaders = [ {
		test: /\.css$/,
		loader: 'css?sourceMap'
	}, {
		test: /\.png$/,
		loader: 'null'
	}, {
		test: /\.jpg$/,
		loader: 'null'
	},

	// Loader for JSON, may be used in some tests
	{
		test: /\.json$/,
		loader: 'json'
	}, {
		test: /\.xml$/,
		loader: "raw"
	}
];


module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'spec.js'
		],
		webpack: {
			devtool: 'eval',
			module: {
				loaders: loaders,
				preLoaders: preLoaders
			},
			cache: true,
			plugins: [
				new webpack.DefinePlugin({
					__DEV__: JSON.stringify(JSON.parse(process.env.ENVIRONMENT === "DEV" || "true"))
				})
			]
		},
		webpackMiddleware: {
			stats: {
				chunkModules: false,
				colors: true
			}
		},
		preprocessors: {
			'spec.js': ['webpack']
		},
		reporters: reporters,
		junitReporter: {
			outputDir: 'test_results',
			outputFile: 'test-results.xml',
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: true
	});
};
