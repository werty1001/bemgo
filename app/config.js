
'use strict';


// Export

module.exports = {

	app: {
		lang: 'ru',
		name: 'Site',
		description: 'Description',
		domain: 'google.com',
		preloader: false,
		responsive: true,
		microdata: false,
		jquery: true
	},

	extnames: {
		templates: '.pug',
		scripts: '.js',
		styles: '.scss'
	},

	dist: {
		styles: 'styles',
		fonts: 'styles/fonts',
		img: 'styles/img',
		scripts: 'scripts',
		static: 'static',
		favicons: 'favicons'
	},

	add: {
		page: `extends ../blocks/layout\n\nblock data\n\n\t- const page = { path: '[name]', title: '', description: '', styles: [], scripts: [] };\n\nblock content\n\n\n\t= nnn\n\t// Header \n\n\t+header\n\n\n\t= nnn\n\t// Content \n\n\t+content\n\n\n\t= nnn\n\t// Footer \n\n\t+footer\n\n`,
		style: '.[name] {}',
		template: `mixin [name]( bem )\n\n\t+b( '[name]', bem )&attributes(attributes)\n\n\t\tblock\n`
	},

	autoCreate: true,
	autoCreateAdd: [ 'style' ],
	autoCreateIgnore: [ 'html' ]

};
