
'use strict'


// Copy assets

module.exports = {

	build: 2,
	name: 'copy:assets',
	globs: [ '*', '*', 'assets', '**', '*.*' ],

	run ( done ) {

		const files = ( this.store.assets || [] )
		const options = {
			since: this.since.bind( this )
		}

		// In dev all files

		if ( this.isDev ) {

			const all = this.paths.blocks( ...this.globs )

			if ( !files.includes( all ) ) files.push( all )

		} else {

			const always = this.globs.join( '::' ).replace( '*.*', '*@always.*' ).split( '::' )

			files.push( this.paths.blocks( ...always ) )
		}


		// Start stream with files or return cb

		if ( files.length === 0 ) return done()

		return this.gulp.src( files, options )
			.pipe( this.plumber() )
			.pipe( this.checkCSS() )
			.pipe( this.dest() )

	},

	watch () {
		return {
			files: this.paths.blocks( ...this.globs ),
			tasks: this.name,
			on: {
				event: 'add',
				handler: require( this.paths.core( 'editTime' ) )
			},
		}
	},

	dest () {
		return this.gulp.dest( file => {

			const path = this.path
			const basename = path.basename( file.path ).replace( '@always', '' )
			const extname = path.extname( basename )

			if ( extname === '.js' ) {

				file.path = path.join( file.base, basename )
				return this.paths._scripts

			} else if ( extname === '.css' ) {

				file.path = path.join( file.base, basename )
				return this.paths._styles

			} else {

				let array = path.relative( this.paths._blocks, file.path ).split( path.sep )
				let asset = [ array[1] ].concat( array.slice(3) )

				if ( asset.includes( 'favicons' ) ) {

					file.path = path.join( file.base, basename )

					return this.paths._favicons

				} else {

					asset = asset.join( path.sep ).replace( '@always', '' )

					file.path = path.join( file.base, asset )

					return this.paths._static

				}

			}

		})
	},

	since ( file ) {
		const isModule = file.path.indexOf( this.paths._blocks ) === -1
		return isModule ? null : this.gulp.lastRun( this.name )
	},

	checkCSS () {
		return require( 'gulp-if' )( file => ( this.path.extname( file.path ) === '.css' ), this.parseURLs() )
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

}

