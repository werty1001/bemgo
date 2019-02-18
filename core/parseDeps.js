
'use strict'


// Require

const parseClass = require( './parseClass' )
const checkModules = require( './checkModules' )
const checkNode = require( './checkNode' )


/**
 * Parse block dependencies.
 *
 * @param {String} block
 * @param {Object} page
 * @param {Object} deps
 * @param {Object} task
 *
 * @return {undefined}
 */

const parseDeps = function ( block, page, deps, task ) {

	if ( !deps[block] ) return

	const { paths, store, isDev } = task
	const { levels } = store


	// Check nodes

	const nodes = deps[block].nodes || []

	nodes.forEach( node => {
		if ( typeof node !== 'string' ) return
		node = node.trim()
		checkNode( node, block, levels, paths, isDev )
		if ( page.nodes[node] ) return
		parseClass( node, page )
		parseDeps( node, page, deps, task )
	})


	// Check modules

	checkModules( block, 'inject', page, deps, task )


}


// Export

module.exports = parseDeps

