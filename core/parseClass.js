
'use strict'


// Require

const BEM = require( './bem' )


/**
 * Parse class from HTML node and add to BEM tree.
 *
 * @param {String} cls
 * @param {Object} page
 * @param {Array} mix
 *
 * @return {undefined}
 */

module.exports = function ( cls, page, mix, attrs, tag ) {

	if ( !cls ) return

	const isModifier = BEM.isModifier( cls )
	const node = isModifier ? BEM.delModifier( cls ) : cls

	if ( !page.nodes[node] ) page.nodes[node] = { name: node, mod: [], mix: [], attrs, tag }

	if ( isModifier ) {

		if ( page.nodes[node].mod.indexOf( cls ) === -1 ) page.nodes[node].mod.push( cls )

	} else {

		if ( mix && mix.length > 0 ) {

			mix.forEach( item => {
				if ( page.nodes[node].mix.indexOf( item ) === -1 ) page.nodes[node].mix.push( item )
			})

		}

		if ( mix && mix.indexOf( cls ) === -1 ) mix.push( cls )

	}

}

