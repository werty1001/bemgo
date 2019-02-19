
'use strict'


// Export

module.exports = {

	app: {
		name: 'Demo',
	},

	use: {
		templates: '.html',
		scripts: '.js',
		styles: '.css',
	},

	build: {
		imagemin: [ 'png', 'jpg' ],
		sourcemaps: [ 'js', 'css' ],
		autoprefixer: [ 'last 3 versions', 'ie 10', 'ie 11' ],
	},

	autoCreate: {
		onlyOnWatch: true,
		files: [ '.css' ],
		levels: [ 'develop' ],
		ignoreNodes: [ 'symbol', /_no_js/i ],
	},

	dist: {
		styles: 'styles',
		fonts: 'styles/fonts',
		img: 'styles/img',
		symbol: 'styles/img',
		scripts: 'scripts',
		static: 'static',
		favicons: 'favicons',
	},

	favicons: {
		android: false,
		appleIcon: false,
		appleStartup: false,
		coast: false,
		favicons: true,
		firefox: false,
		windows: false,
		yandex: false,
	},

	HTMLBeautify: {
		preserve_newlines: false,
	},

}

