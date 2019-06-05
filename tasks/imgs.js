
'use strict'


// Copy images for styles

module.exports = {

	build: 3,
	name: 'copy:imgs',
	globs: [ '*', '*', 'img', '**', '*.{webp,png,jpg,jpeg,svg,gif,ico}' ],

	run ( done ) {

		const files = ( this.store.imgs || [] )
		const options = {
			since: this.since.bind( this )
		}

		// In dev all files

		if ( this.isDev ) {

			const all = this.paths.blocks( ...this.globs )

			if ( !files.includes( all ) ) files.push( all )

		} else {

			const always = this.globs.join( '::' ).replace( '*.{', '*@always.{' ).split( '::' )

			files.push( this.paths.blocks( ...always ) )
		}


		// Start stream with files or return cb

		if ( files.length === 0 ) return done()

		return this.gulp.src( files, options )
			.pipe( this.plumber() )
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
			const isSprite = file.path.indexOf( path.join( 'img', 'sprite' ) ) !== -1
			const relative = file.path.indexOf( this.paths._blocks ) !== -1 ? this.paths._blocks : this.paths._root
			const block = path.relative( relative, file.path ).split( path.sep )[1]
			const name = ( isSprite ? 'sprite_' : '' ) + `${block}_${basename}`

			file.path = path.join( file.base, name )

			return this.paths._img

		})
	},

	since ( file ) {
		const isModule = file.path.indexOf( this.paths._blocks ) === -1
		return isModule ? null : this.gulp.lastRun( this.name )
	},

}

