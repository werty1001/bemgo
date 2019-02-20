
'use strict'


// Require

const beautify = require( 'js-beautify' ).html


/**
 * Beautifier for ugly HTML code.
 *
 * @param {Object} file
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( file, task ) {

	const content = String( file.contents )
	const options = task.config.HTMLBeautify

	file.contents = Buffer.from( beautify( content, options ) )

}

