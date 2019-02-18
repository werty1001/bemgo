
'use strict'


// Require

const { isFile } = require( './is' )


/**
 * Check a file from block dependency.
 *
 * @param {String} file
 * @param {String} block
 * @param {String} item
 * @param {Boolean} isDev
 *
 * @return {Boolean}
 */

module.exports = function ( file, block, item, isDev ) {

	if ( ! isFile( file ) ) {

		const message = `\n\n\x1b[41mFAIL\x1b[0m: Block "\x1b[36m${block}\x1b[0m" has dependency "\x1b[36m${item}\x1b[0m", but this file not found, please install module or remove it from "\x1b[36m${block}/deps.js\x1b[0m"!\n\nNot found: ${file}.\n\n`

		if ( !isDev ) throw new Error( message )

		console.log( message )

		return false

	}

	return true

}

