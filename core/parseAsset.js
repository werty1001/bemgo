
'use strict'


// Require

const { isExternal  } = require( './is' )


/**
 * Parse attr value and try to find assets.
 *
 * @param {String} value
 * @param {Object} page
 * @param {Object} paths
 *
 * @return {undefined}
 */

module.exports = function ( value, page, paths ) {

	const assets = value.split( ',' )

	assets.forEach( asset => {

		asset = asset.trim()

		if ( !asset || isExternal( asset ) ) return

		asset = asset.replace( / \d{1,2}x$/g, '' ).trim()

		let file = false

		asset.replace( /^@([\w-]+)(.*)/i, ( str, block, end ) => {
			if ( [ 'styles', 'symbol', 'scripts', 'static', 'favicons' ].includes( block ) ) return
			return ( file = paths.blocks( '*', block, 'assets', end ) )
		})

		if ( file && page.assets.indexOf( file ) === -1 ) page.assets.push( file )

	})

}

