
'use strict'


// Generate favicons

module.exports = {

	build: 2,
	name: 'generate:favicons',

	run ( done ) {

		const icon = this.paths.app( 'icon.png' )

		// Return cb if dev or icon doesn't exist

		if ( this.isDev || !this.isFile( icon ) ) return done()

		return this.gulp.src( icon )
			.pipe( this.plumber() )
			.pipe( this.favicons() )
			.pipe( this.dest() )

	},

	dest () {
		return this.gulp.dest( this.paths._favicons )
	},

	favicons () {

		const config = this.config.manifest || {}

		config.icons = this.config.favicons

		return require( 'gulp-favicons' )( config )

	},

}

