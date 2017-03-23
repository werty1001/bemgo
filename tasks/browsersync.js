
'use strict';


// Export

module.exports = ( task, core ) => {


	if ( ! core.isDevelopment ) return ( cb ) => cb();


	const browserSync = require( 'browser-sync' ).create();

	browserSync.init({

		server: core.path.DIST,
		port: core.port,
		tunnel: false,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		}

	});


	return ( cb ) => browserSync.watch( core.path.dist( '**/*.*' ) ).on( 'change', browserSync.reload );


};
