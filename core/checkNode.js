
'use strict'


// Require

const BEM = require( './bem' )
const { isDirectory } = require( './is' )


/**
 * Check a node from block dependency.
 *
 * @param {String} node
 * @param {String} block
 * @param {Array} levels
 * @param {Object} paths
 * @param {Boolean} isDev
 *
 * @return {undefined}
 */

module.exports = function ( node, from, levels, paths, isDev ) {

	const isBlock = BEM.isBlock( node )
	const block = isBlock ? node : BEM.getBlock( node )

	let exist = false

	for ( let i = 0, level; level = levels[i]; i++ ) {

		if ( isDirectory( paths.blocks( level, block ) ) ) {
			exist = true
			break
		}

	}

	if ( exist ) return

	const message = `\n\n\x1b[41mFAIL\x1b[0m: Block "\x1b[36m${from}\x1b[0m" has dependency "\x1b[36m${node}\x1b[0m", but block "\x1b[36m${block}\x1b[0m" not found, please create block or remove it from "\x1b[36m${from}/deps.js\x1b[0m"!\n\n`

	if ( !isDev ) throw new Error( message )

	console.log( message )

}

