
'use strict';


// Export

module.exports = {

	app: {
		lang: 'en',
		name: 'Site',
		description: 'Description',
		domain: 'google.com',
		preloader: false,
		responsive: true,
		microdata: false,
		jquery: false
	},

	options: {
		cssBundles: false,
		jsBundles: false,
		sourcemap: false,
		babel: false
	},

	levels: {
		common: 1,
		develop: 2
	},

	mainLevel: 'develop',

	extnames: {
		templates: '.html',
		scripts: '.js',
		styles: '.css'
	},

	dist: {
		styles: 'styles',
		fonts: 'styles/fonts',
		img: 'styles/img',
		scripts: 'scripts',
		static: 'static',
		favicons: 'favicons'
	},

	head: {
		favicons: true,
		androidIcons: false,
		appleTouchIcons: false,
		msapplication: false,
		safariPinned: false,
		manifest: false
	},

	manifest: {
		appName: 'Name',
		appDescription: 'Description',
		background: '#020307',
		display: 'standalone',
		orientation: 'portrait',
		start_url: '/?homescreen=1'
	},

	ftp: {
		port: 21,
		host: false,
		user: false,
		pass: false,
		dest: false
	},

	blocks: {
		app: {}
	},

	use: {
		assets: [],
		symbol: [],
		styles: [],
		scripts: []
	},

	add: {
		page: '',
		json: '',
		style: '',
		script: '',
		template: '',
		block: ''
	},

	autoCreate: false,
	autoCreateAdd: [],
	autoCreateIgnore: [ 'symbol' ],
	autoCreateCheckLevels: [],

	assetsAttr: [ 'href', 'src', 'srcset' ]

};
