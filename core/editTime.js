
'use strict'


// Require

const fs = require( 'fs' )


/**
 * Change the file system timestamps at the given `path`.
 *
 * @param {String} path
 *
 * @return {undefined}
 */

module.exports = function ( path ) {

	try {

		const time = Date.now() / 1000

		fs.utimesSync( path, time, time )

	} catch (e) {

		console.log(e)

	}

}

