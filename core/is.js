
'use strict'


// Require

const fs = require( 'fs' )


/**
 * Check some.
 *
 * @param {String}
 *
 * @return {Boolean}
 */

module.exports = {

	isFile ( filePath ) {

		let file = false

		try {

			file = fs.statSync( filePath )

		} catch (e) {}

		return file && !file.isDirectory()

	},

	isDirectory ( directoryPath ) {

		let stats = false

		try {

			stats = fs.lstatSync( directoryPath )

		} catch (e) {}

		return stats && stats.isDirectory()

	},

	isExternal ( str ) {

		return /^(?:https?\:)?\/\//i.test( str ) || str.indexOf( 'data:' ) === 0 || str.charAt(0) === '#'

	},

}

