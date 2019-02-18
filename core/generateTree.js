
'use strict'


/**
 * Parse nodes from pages and generate BEM tree.
 *
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( task ) {

	const { store, isDev, config, mainBundle } = task

	const symbol = ( store.symbol = [] )
	const assets = ( store.assets = [] )
	const pages = store.pages
	const tree = ( store.tree = {} )


	// Check all pages

	const app = {}

	if ( pages[mainBundle] ) delete pages[mainBundle]

	Object.keys( pages ).forEach( page => {

		if ( !page ) return

		Object.keys( pages[page].nodes ).forEach( node => {

			if ( !app[node] ) app[node] = { mod: [], mix: [] }

			pages[page].nodes[node].mod.forEach( mod => {
				if ( app[node].mod.indexOf( mod ) === -1 ) app[node].mod.push( mod )
			})

			pages[page].nodes[node].mix.forEach( mix => {
				if ( app[node].mix.indexOf( mix ) === -1 ) app[node].mix.push( mix )
			})

		})

		pages[page].symbol.forEach( icon => {
			if ( symbol.indexOf( icon ) === -1 ) symbol.push( icon )
		})

		pages[page].assets.forEach( asset => {
			if ( assets.indexOf( asset ) === -1 ) assets.push( asset )
		})

	})


	// Throw Error when same name

	if ( ( !isDev && config.build.bundles.length > 0 ) && pages[mainBundle] )
		throw new Error( `\n\n\x1b[41mFAIL\x1b[0m: A page "\x1b[36m${mainBundle}\x1b[0m" have the same name as main bundle, please rename the page or change bundle name in config!` )

	pages[mainBundle] = {nodes: app}


	// Parse mix

	const parse = ( key, page ) => {

		if ( pages[page].nodes[key].already ) return

		pages[page].nodes[key].already = true

		if ( !tree[page] ) tree[page] = {}

		if ( pages[page].nodes[key].mix.length > 0 ) {

			pages[page].nodes[key].mix.forEach( mix => parse( mix, page ) )

		}

		return tree[page][key] = pages[page].nodes[key].mod
	}

	Object.keys( pages ).forEach( page => {

		Object.keys( pages[page].nodes ).forEach( key => parse( key, page ) )

	})


}

