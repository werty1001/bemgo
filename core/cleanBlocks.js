
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const BEM = require( './bem' )
const { isDirectory } = require( './is' )


/**
 * Check all blocks and del unnecessary files.
 *
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( task ) {

	const { paths, store, config, mainBundle } = task

	const blocks = paths._blocks
	const tree = store.tree[mainBundle]
	const clean = []

	if ( !tree ) return

	try {

		fs.readdirSync( blocks ).forEach( level => {

			if ( !isDirectory( paths.blocks( level ) ) ) return

			fs.readdirSync( paths.blocks( level ) ).forEach( block => {

				if ( !isDirectory( paths.blocks( level, block ) ) ) return

				if ( config.cleanProtect.includes( block ) ) return

				if ( !tree[block] ) return clean.push( paths.blocks( level, block ) )

				fs.readdirSync( paths.blocks( level, block ) ).forEach( file => {

					if ( isDirectory( paths.blocks( level, block, file ) ) ) return

					if ( !path.extname( file ) ) return

					const extname = path.extname( file )
					const basename = path.basename( file, extname )

					if ( BEM.isElement( basename ) && !tree[basename] )
						return clean.push( paths.blocks( level, block, file ) )

					if ( BEM.isModifier( basename ) ) {

						const node = BEM.delModifier( basename )

						if ( !tree[node] || !tree[node].includes( basename ) )
							return clean.push( paths.blocks( level, block, file ) )

					}

				})

			})

		})

		require( 'del' ).sync( clean )

	} catch (e) {

		console.log(e)

	}


}

