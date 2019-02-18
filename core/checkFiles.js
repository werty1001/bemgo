
'use strict'


// Require

const path = require( 'path' )
const BEM = require( './bem' )
const checkModules = require( './checkModules' )
const { isFile } = require( './is' )


/**
 * Check a files from bem tree.
 *
 * @param {String} type
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( type, task ) {


	// Options

	const { store, paths, config, isDev, mainBundle } = task
	const { tree, deps, levels } = store

	const imports = store[type]
	const extname = config.use[type]
	const needBundles = config.build.bundles.includes( type === 'scripts' ? 'js' : 'css' )
	const pages = !isDev && needBundles ? Object.keys( tree ) : [mainBundle]
	const importExtnames = {
		styles: [ '.css', config.use.styles ],
		scripts: [ '.js', config.use.scripts ],
	}

	if ( !tree ) return


	// Check all pages

	pages.forEach( page => {

		if ( !page ) return

		const nodes = tree[page]
		const array = ( imports[page] = [] )

		if ( !nodes ) return


		// Check all nodes from page

		Object.keys( nodes ).forEach( node => {

			const block = BEM.getBlock( node )


			// If node is block check modules

			if ( BEM.isBlock( node ) && deps[node] )
				checkModules( node, 'import', ( store.pages && store.pages[page] ), deps, task, importExtnames[type], array )


			// Check node in all levels

			levels.forEach( level => {

				const files = [node].concat( nodes[node] )

				files.forEach( item => {

					const file = paths.blocks( level, block, item + extname )

					if ( isFile( file ) && array.indexOf( file ) === -1 ) array.push( file )

				})

			})


		})

	})

}

