
'use strict'


// Require

const parseClass = require( './parseClass' )


/**
 * Parse xlink attribute from use tag.
 *
 * @param {String} attr
 * @param {Object} page
 * @param {Object} paths
 *
 * @return {undefined}
 */

module.exports = function ( attr, page, paths ) {

	if ( typeof attr !== 'string' ) return

	parseClass( 'symbol', page )

	const id = attr.split( '#' ).pop()
	const array = id ? id.split( '__' ) : []

	if ( array.length < 2 ) return

	const file = paths.blocks( '*', array[0], 'symbols', `${array[1]}.svg` )

	if ( page.symbol.indexOf( file ) === -1 ) page.symbol.push( file )

}

