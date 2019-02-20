
'use strict'


// Compile scripts

module.exports = {

	build: 2,
	name: 'compile:scripts',

	run ( done ) {

		const scripts = ( this.store.scripts = {} )
		const checkFiles = require( this.paths.core( 'checkFiles' ) )

		checkFiles( 'scripts', this ) // Check scripts before compile

		// Compile

		if ( this.isDev || !this.config.build.bundles.includes( 'js' ) ) {

			const files = ( scripts[this.mainBundle] || [] )

			return this.compileBundle( files, this.mainBundle, done )

		} else {

			return this.compileBundles( scripts )

		}

	},

	compileBundle ( files, bundle, done ) {

		if ( files.length === 0 ) return done()

		const options = {
			sourcemaps: this.config.build.sourcemaps.includes( 'js' )
		}

		return this.gulp.src( files, options )
			.pipe( this.plumber() )
			.pipe( this.babel() )
			.pipe( this.concat( bundle ) )
			.pipe( this.dest( this.isDev ? options.sourcemaps : false ) )
			.pipe( this.uglify() )
			.pipe( this.rename() )
			.pipe( this.minifyDest( options.sourcemaps ) )
			.on( 'end', done )

	},

	watch () {
		return {
			files: this.paths.blocks( '**', '!(deps)' + this.config.use.scripts ),
			tasks: this.name,
		}
	},

	dest ( sourcemaps ) {
		return this.gulp.dest( this.paths._scripts, {
			sourcemaps: sourcemaps ? '.' : false
		})
	},

	concat ( bundle ) {
		return require( 'gulp-concat' )({
			path: this.path.join( this.paths._root, `${bundle}.js` )
		})
	},

	babel () {
		if ( !this.config.build.babel ) return this.pipe()
		return require( 'gulp-babel' )({
			configFile: this.paths.root( '.babelrc' )
		})
	},

	uglify () {
		return require( 'gulp-if' )( this.forMinify.bind( this ), require( 'gulp-uglify' )() )
	},

	rename () {
		return require( 'gulp-if' )( this.forMinify.bind( this ), require( 'gulp-rename' )({ suffix: '.min' }) )
	},

	forMinify ( file ) {
		return !this.isDev && this.path.extname( file.path ) === '.js'
	},

	minifyDest ( sourcemaps ) {
		return require( 'gulp-if' )( !this.isDev, this.dest( sourcemaps ) )
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

