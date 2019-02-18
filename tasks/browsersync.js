
'use strict'


// Start watch with browserSync

module.exports = {

	build: 4,
	name: 'browserSync:watch',

	run ( done ) {

		if ( !this.isDev || !process.env.WATCH ) return done()

		const browserSync = require( 'browser-sync' ).create()

		browserSync.init({
			server: this.paths._dist,
			port: process.env.PORT || 3000,
			tunnel: process.env.TUNNEL || false,
			snippetOptions: {
				rule: {
					match: /<\/body>/i
				}
			}
		})

		this.store.watch = true

		return browserSync
			.watch( this.paths.dist( '**', '*.*' ) )
			.on( 'change', browserSync.reload )

	},

}

