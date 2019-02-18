
'use strict'


// Require

const path = require( 'path' )
const injectToHTML = require( './injectToHTML' )


/**
 * Inject some data to HTML.
 *
 * @param {Object} file
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( file, task ) {

	const code = String( file.contents )
	const name = path.basename( file.path, path.extname( file.path ) )
	const page = task.store.pages[name]
	const injected = injectToHTML( code, page, task )		

	file.contents = Buffer.from( injected )

}

