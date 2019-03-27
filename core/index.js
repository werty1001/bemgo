
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const notify = require( 'gulp-notify' )
const { isFile, isDirectory } = require( './is' )


// Paths

const root = path.resolve( __dirname, '..' )

const paths = {

	slashNormalize ( str ) {

		const isExtendedLengthPath = /^\\\\\?\\/.test( str )
		const hasNonAscii = /[^\u0000-\u0080]+/.test( str ) // eslint-disable-line no-control-regex

		if ( isExtendedLengthPath || hasNonAscii ) return str

		return str.replace( /\\/g, '/' )

	},

	root () {
		return path.join( this._root, ...arguments )
	},

	core () {
		return path.join( this._core, ...arguments )
	},

	tasks () {
		return path.join( this._tasks, ...arguments )
	},

	dist () {
		return path.join( this._dist, ...arguments )
	},

	app () {
		return path.join( this._app, ...arguments )
	},

	blocks () {
		return path.join( this._blocks, ...arguments )
	},

	pages () {
		return path.join( this._pages, ...arguments )
	},

	_root: root,
	_core: __dirname,
	_tasks: path.join( root, 'tasks' ),
	_dist: path.join( root, 'dist' ),
	_app: path.join( root, 'app' ),
	_blocks: path.join( root, 'app', 'blocks' ),
	_pages: path.join( root, 'app', 'pages' ),

}


// Add main dirs

try {

	if ( !isDirectory( paths._app ) ) fs.mkdirSync( paths._app )
	if ( !isDirectory( paths._blocks ) ) fs.mkdirSync( paths._blocks )

} catch(e) {

	console.log(e)
	notify.onError( 'Error' )(e)

}


// Try read config

let config = {}

try {

	const appConfig = paths.app( 'config.js' )

	if ( isFile( appConfig ) ) config = require( appConfig )

} catch(e) {

	console.log(e)
	notify.onError( 'Error' )(e)

} finally {


	// Merge extnames

	const use = {
		templates: '.html',
		scripts: '.js',
		styles: '.css',
	}

	config.use = Object.assign( use, config.use )

	if ( config.use.templates[0] !== '.' ) config.use.templates = '.' + config.use.templates
	if ( config.use.scripts[0] !== '.' ) config.use.scripts = '.' + config.use.scripts
	if ( config.use.styles[0] !== '.' ) config.use.styles = '.' + config.use.styles


	// Merge build

	const build = {
		autoprefixer: [ 'last 3 versions' ],
		babel: false,
		BEML: false,
		bundles: [],
		sourcemaps: [],
		imagemin: [],
		mainBundle: 'app',
		mainLevel: 'develop',
		pugMap: false,
		globalStyle: false,
		addVersions: true,
		HTMLRoot: './',
	}

	config.build = Object.assign( build, config.build )

	if ( !Array.isArray( config.build.bundles ) ) config.build.bundles = [config.build.bundles]
	if ( !Array.isArray( config.build.sourcemaps ) ) config.build.sourcemaps = [config.build.sourcemaps]
	if ( !Array.isArray( config.build.autoprefixer ) ) config.build.autoprefixer = [config.build.autoprefixer]

	config.build.imagemin = [].concat( config.build.imagemin ).filter( el => [ 'png', 'jpg', 'svg', 'gif' ].includes( el ) )

	if ( config.build.imagemin.includes( 'jpg' ) ) config.build.imagemin.push( 'jpeg' )


	// Merge autoCreate

	if ( !config.autoCreate ) config.autoCreate = {}

	config.autoCreate = {
		onlyOnWatch: true,
		folders: [].concat( config.autoCreate.folders ).filter( el => !!el ),
		files: [].concat( config.autoCreate.files ).filter( el => !!el ),
		levels: [].concat( config.autoCreate.levels ).filter( el => !!el ),
		ignoreNodes: [].concat( config.autoCreate.ignoreNodes ).filter( el => !!el ),
		ignoreStyle: [].concat( config.autoCreate.ignoreStyle ).filter( el => !!el ),
		ignoreScript: [].concat( config.autoCreate.ignoreScript ).filter( el => !!el ),
		ignoreTemplate: [].concat( config.autoCreate.ignoreTemplate ).filter( el => !!el ),
	}

	
	// Merge addContent

	const addContent = {
		deps: `\n'use strict'\n\nmodule.exports = {\n\n\tnodes: [],\n\n\tmodules: [],\n\n}\n`,
		json: '{\n\t"key": "value"\n}',
		css: '.[name] {}'
	}

	config.addContent = Object.assign( addContent, config.addContent )


	// Merge favicons

	const favicons = {
		android: false,
		appleIcon: false,
		appleStartup: false,
		coast: false,
		favicons: true,
		firefox: false,
		windows: false,
		yandex: false
	}

	config.favicons = Object.assign( favicons, config.favicons )


	// Merge dist

	const dist = {
		styles: 'styles',
		fonts: 'styles/fonts',
		img: 'styles/img',
		symbol: 'styles/img',
		scripts: 'scripts',
		static: 'static',
		favicons: 'favicons',
	}

	config.dist = Object.assign( dist, config.dist )


	// Merge optimization

	const optimization = {
		jpg: {
			progressive: true,
			arithmetic: false,
		},
		png: {
			optimizationLevel: 5,
			bitDepthReduction: true,
			colorTypeReduction: true,
			paletteReduction: true,
		},
		gif: {
			optimizationLevel: 1,
			interlaced: true
		},
		svg: [
			{ cleanupIDs: false },
			{ removeViewBox: false },
			{ mergePaths: false },
		],
	}

	if ( !config.optimization ) config.optimization = {}

	config.optimization = {
		jpg: Object.assign( optimization.jpg, config.optimization.jpg ),
		png: Object.assign( optimization.png, config.optimization.png ),
		gif: Object.assign( optimization.gif, config.optimization.gif ),
		svg: [].concat( config.optimization.svg || optimization.svg ),
		ignore: [].concat( config.optimization.ignore ).filter( el => !!el ),
	}


	// Protect

	config.cleanProtect = [].concat( config.cleanProtect )


	// HTMLBeautify

	const beautify = {
		indent_size: 2,
		indent_char: ' ',
		indent_with_tabs: false,
		indent_inner_html: true,
		end_with_newline: false,
		extra_liners: [],
		preserve_newlines: true,
		max_preserve_newlines: 2,
		content_unformatted: [ 'pre', 'textarea' ],
	}

	if ( config.HTMLBeautify !== false ) config.HTMLBeautify = Object.assign( beautify, config.HTMLBeautify )


	// Add dist paths

	for ( let key in config.dist ) {
		if ( ! paths[`_${key}`] ) paths[`_${key}`] = path.join( paths._dist, ( config.dist[key] || '' ).trim() )
	}

}


// Export

module.exports = { notify, paths, config }

