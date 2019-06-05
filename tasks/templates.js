
'use strict'


// Compile templates

module.exports = {

	build: 1,
	name: 'compile:templates',
	globs: '!(_*)',

	run ( done ) {

		const files = this.paths.pages( this.globs + this.config.use.templates )
		const ready = this.HTMLReady.bind( this, done )
		const options = {
			since: this.since.bind( this )
		}

		return this.gulp.src( files, options )
			.pipe( this.plumber() )
			.pipe( this.compile() )
			.pipe( this.beml() )
			.pipe( this.parse() )
			.pipe( this.pretty() )
			.pipe( this.dest() )
			.on( 'end', ready )

	},

	watch () {
		const extname = this.config.use.templates
		return [
			{
				files: this.paths.pages( this.globs + extname ),
				tasks: this.name,
				options: {
					delay: 500,
				},
			},
			{
				files: this.paths.blocks( '**', `deps.js` ),
				tasks: [
					'compile:templates',
					'compile:styles',
					'compile:scripts',
					'copy:assets',
					'copy:fonts',
					'copy:imgs'
				],
				options: {
					delay: 250,
				},
				on: {
					event: 'change',
					handler: this.checkDeps.bind( this )
				},
			},
			{
				files: this.paths.blocks( '**', `(data.json|*${extname})` ),
				on: {
					event: 'change',
					handler: this.checkIsOnPage.bind( this )
				},
			},
		]
	},

	dest () {
		return this.gulp.dest( this.paths._dist )
	},

	compile () {

		const extname = this.config.use.templates.slice(1)
		const readBlocks = require( this.paths.core( 'readBlocks' ) )

		readBlocks( this ) // Before compile read all blocks

		if ( typeof this[extname] === 'function' ) return this[extname]()

		console.log( `\nSorry, support only twig/pug/html files, you must tune "${this.name}" task for compile another engine!\n` )

		return this.pipe()

	},

	pug () {
		return require( 'gulp-pug' )({
			doctype: 'html',
			basedir: this.paths._root,
			data: {
				global: this.getGlobalData()
			}
		})
	},

	twig () {
		return require( 'gulp-twig' )({
			data: {
				global: this.getGlobalData()
			}
		})
	},

	html () {
		return require( 'gulp-file-include' )({
			prefix: '@@',
			basepath: this.paths._blocks,
			context: {
				global: this.getGlobalData()
			}
		})
	},

	getGlobalData () {
		return {
			isDev: this.isDev,
			jsons: this.store.jsons,
			app: this.config.app || {},
		}
	},

	beml () {
		const beml = this.config.build.BEML
		const config = Object.assign( {}, beml )
		return require( 'gulp-if' )( !!beml, require( 'gulp-beml' )( config ) )
	},

	pretty () {

		if ( !this.isDev || !this.config.HTMLBeautify ) return this.pipe()

		const prettyHTML = require( this.paths.core( 'prettyHTML' ) )

		return this.pipe( prettyHTML, this, 'prettyHTML' )

	},

	parse () {

		const parseHTML = require( this.paths.core( 'parseHTML' ) )

		if ( !this.store.pages ) this.store.pages = {}

		return this.pipe( parseHTML, this, 'parseHTML' )

	},

	HTMLReady ( done ) {

		const generateTree = require( this.paths.core( 'generateTree' ) )
		const cleanBlocks = require( this.paths.core( 'cleanBlocks' ) )
		const autoCreate = require( this.paths.core( 'autoCreate' ) )
		const onlyOnWatch = this.config.autoCreate.onlyOnWatch

		generateTree( this )

		if ( process.env.CLEAN ) {
			cleanBlocks( this )
			return done()
		}

		if ( !onlyOnWatch || onlyOnWatch && this.store.watch ) autoCreate( this )

		this.store.depsChanged = false

		return done()

	},

	checkIsOnPage ( file ) {

		const path = this.path
		const pages = this.store.pages || {}
		const editTime = require( this.paths.core( 'editTime' ) )

		let name = path.basename( file )

		if ( [ 'data.json', 'deps.js' ].includes( name ) )
			name = path.dirname( file ).split( path.sep ).pop()
		else
			name = path.basename( file, path.extname( file ) )

		Object.keys( pages ).forEach( page => {

			if ( page === this.mainBundle ) return

			if ( name === 'layout' || name in pages[page].nodes )
				return editTime( this.paths.pages( page + this.config.use.templates ) )

		})

	},

	since ( file ) {
		const path = this.path
		const page = path.basename( file.path )
		const pageInDeps = this.store.depsChanged && this.store.depsChanged.includes( page )
		return pageInDeps ? null : this.gulp.lastRun( this.name )
	},

	checkDeps ( file ) {

		const path = this.path
		const pages = this.store.pages || {}
		const block = path.dirname( file ).split( path.sep ).pop()
		const changed = []

		Object.keys( pages ).forEach( page => {

			if ( page === this.mainBundle ) return

			if ( !( block in pages[page].nodes ) ) return

			page = page + this.config.use.templates

			if ( !changed.includes( page ) ) changed.push( page )

		})

		this.store.depsChanged = changed

	},

}

