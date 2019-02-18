
'use strict'


// Compile styles

module.exports = {

	build: 2,
	name: 'compile:styles',

	run ( done ) {

		const styles = ( this.store.styles = {} )
		const checkFiles = require( this.paths.core( 'checkFiles' ) )

		checkFiles( 'styles', this ) // Check styles before compile

		// Compile

		if ( this.isDev || !this.config.build.bundles.includes( 'css' ) ) {

			const files = ( styles[this.mainBundle] || [] )

			return this.compileBundle( files, this.mainBundle, done )

		} else {

			return this.compileBundles( styles )

		}

	},

	compileBundle ( files, bundle, done ) {

		if ( files.length === 0 ) return done()

		const options = {
			sourcemaps: this.config.build.sourcemaps.includes( 'css' )
		}

		return this.gulp.src( files, options )
			.pipe( this.plumber() )
			.pipe( this.addGlobalHelper() )
			.pipe( this.compile() )
			.pipe( this.parseURLs() )
			.pipe( this.concat( bundle ) )
			.pipe( this.postcss( bundle ) )
			.pipe( this.dest( this.isDev ? options.sourcemaps : false ) )
			.pipe( this.cssnano() )
			.pipe( this.rename() )
			.pipe( this.minifyDest( options.sourcemaps ) )
			.on( 'end', done )

	},

	watch () {
		const extname = this.config.use.styles
		return {
			files: this.paths.blocks( '**', `*{.css,${extname}}` ),
			tasks: this.name,
		}
	},

	dest ( sourcemaps ) {
		return this.gulp.dest( this.paths._styles, {
			sourcemaps: sourcemaps ? '.' : false
		})
	},

	compile () {

		let extname = this.config.use.styles.slice(1)

		if ( extname === 'scss' ) extname = 'sass'

		if ( typeof this[extname] === 'function' ) return this[extname]()

		return this.css()

	},

	styl () {
		return require( 'gulp-stylus' )({
			'include css': true,
			define: {
				url: require( 'stylus' ).resolver()
			},
		})
	},

	less () {
		return require( 'gulp-less' )({
			rewriteUrls: 'all'
		})
	},

	sass () {
		return require( 'gulp-sass' )({
			importer: require( this.paths.core( 'sassResolver' ) )
		})
	},

	css () {
		this.preprocessor = false
		return this.pipe()
	},

	concat ( bundle ) {
		return require( 'gulp-concat' )({
			path: this.path.join( this.paths._root, `${bundle}.css` )
		})
	},

	cssnano () {
		const config = {
			reduceTransforms: false,
			discardUnused: false,
			convertValues: false,
			normalizeUrl: false,
			autoprefixer: false,
			reduceIdents: false,
			mergeIdents: false,
			zindex: false,
			calc: false
		}
		return require( 'gulp-if' )( this.forMinify.bind( this ), require( 'gulp-cssnano' )( config ) )
	},

	rename () {
		return require( 'gulp-if' )( this.forMinify.bind( this ), require( 'gulp-rename' )({ suffix: '.min' }) )
	},

	minifyDest ( sourcemaps ) {
		return require( 'gulp-if' )( !this.isDev, this.dest( sourcemaps ) )
	},

	forMinify ( file ) {
		return !this.isDev && this.path.extname( file.path ) === '.css'
	},

	postcss ( bundle ) {

		const postcss = require( 'gulp-postcss' )
		const plugins = []

		// Main plugins always used

		plugins.push(

			require( 'autoprefixer' )({
				remove: false,
				browsers: this.config.build.autoprefixer
			}),

		)

		// Only production plugins

		if ( !this.isDev ) plugins.push(

			this.generateSprites( bundle ),

			require( 'stylefmt' )({
				configFile: this.paths.root( '.stylelintrc' )
			})

		)

		return postcss( plugins )

	},

	generateSprites ( bundle ) {
		return require( 'postcss-sprites' )({
			spriteName: bundle,
			spritePath: this.paths._img,
			stylesheetPath: this.paths._styles,
			spritesmith: {
				padding: 1,
				algorithm: 'binary-tree'
			},
			svgsprite: {
				shape: {
					spacing: {
						padding: 1
					}
				}
			},
			retina: true,
			verbose: false,
			filterBy: this.checkIsSprite.bind( this ),
			hooks: {
				onSaveSpritesheet: this.onSaveSpritesheet.bind( this ),
			},		
		})
	},

	checkIsSprite ( image ) {

		if ( image.url.indexOf( this.path.join( 'img', 'sprite' ) ) !== -1 ) return Promise.resolve()

		return Promise.reject()

	},

	onSaveSpritesheet ( config, spritesheet ) {

		if ( spritesheet.groups.length === 0 ) spritesheet.groups.push( '' )

		const basename = `sprite_${config.spriteName}`
		const extname = spritesheet.groups.concat( spritesheet.extension ).join( '.' )

		return this.path.join( config.spritePath, basename + extname )

	},

	addGlobalHelper () {

		if ( !this.config.build.globalStyles ) return this.pipe()

		return this.pipe( require( this.paths.core( 'injectHelper' ) ), this, 'injectHelper' )

	},

	parseURLs () {

		const parseCssUrl = require( this.paths.core( 'parseCssUrl' ) )

		if ( !this.store.imgs ) this.store.imgs = []
		if ( !this.store.fonts ) this.store.fonts = []

		return require( 'gulp-postcss' )([
			require( 'postcss-url' )({
				url: parseCssUrl.bind( this )
			})
		])

	},

	compileBundles ( bundles ) {

		const promises = []

		Object.keys( bundles ).forEach( bundle => {

			const files = bundles[bundle]

			if ( files.length === 0 ) return

			const promise = new Promise( ( resolve, reject ) => {
				this.compileBundle( files, bundle, resolve )
			})

			return promises.push( promise )

		})

		return Promise.all( promises )

	},

}

