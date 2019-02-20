
'use strict'


// Creating zip archive with a complete build or snapshot with development files

module.exports = {

	name: 'zip',

	run ( done ) {

		let files = this.paths.dist( '**', '*.*' )

		if ( process.env.SNAPSHOT ) files = [
			this.paths.root( '.!(DS_Store)' ),
			this.paths.root( '*.!(log|db|ini|zip)' ),
			this.paths.root( '!(node_modules|bower_components|dist)', '**', '*.*' ),
		]

		return this.gulp.src( files )
			.pipe( this.plumber() )
			.pipe( this.zip() )
			.pipe( this.dest() )

	},

	dest () {
		return this.gulp.dest( this.paths._root )
	},

	zip () {

		const prefix = process.env.SNAPSHOT ? 'dev_' : ''
		const name = ( this.config.app && this.config.app.name || 'app' )

		return require( 'gulp-zip' )( prefix + name + `[${this.getTime()}].zip` )
	},

	getTime () {

		const now = new Date()
		const year = now.getFullYear()
		const month = ( '0' + ( now.getMonth() + 1 ) ).slice(-2)
		const day = ( '0' + now.getDate() ).slice(-2)
		const hours = ( '0' + now.getHours() ).slice(-2)
		const minutes = ( '0' + now.getMinutes() ).slice(-2)

		return `${year}-${month}-${day}__${hours}-${minutes}`
	},

}

