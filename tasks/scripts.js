
'use strict';


// Require

const webpack = require( 'webpack' );


// Export

module.exports = ( task, core ) => {


	const config = {

		entry: core.getEntry(),

		output: {
			path: core.path.SCRIPTS,
			filename: '[name].js',
			library: 'app'
		},

		module: {
			rules: []
		},

		plugins: [

			new webpack.NoErrorsPlugin(),

			new webpack.DefinePlugin({
				'__webpackSymbol__': JSON.stringify( core.symbol )
			})

		],

		externals: {
			'jquery': 'jQuery'
		},

		devtool: ( core.config.options.sourcemap && core.isDevelopment ) ? 'cheap-module-inline-source-map' : false

	};

	// Add babel

	if ( core.config.options.babel ) {

		config.module.rules.push({
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: [ 'babel-loader?presets[]=env' ]
		});

	}

	// Add optimize

	if ( ! core.isDevelopment ) {

		config.plugins.push(

			new webpack.optimize.UglifyJsPlugin({
				include: /\.min\.js$/,
				compress: {
					warnings: false,
					unsafe: true
				}
			})

		);

	}


	return ( cb ) => webpack( config, ( err, stats ) => {

		if ( ! err ) err = stats.toJson().errors[0];

		cb( !core.isDevelopment && err ? err : '' );

	});


};

