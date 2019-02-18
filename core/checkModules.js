
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const checkFile = require( './checkFile' )
const { isExternal } = require( './is' )


/**
 * Check a modules from block dependency.
 *
 * @param {String} block
 * @param {String} type
 * @param {Object} page
 * @param {Object} deps
 * @param {Object} task
 * @param {Array} extnames
 * @param {Array} imports
 *
 * @return {undefined}
 */

module.exports = function ( block, type, page, deps, task, extnames, imports ) {

	const { isDev } = task
	const modules = deps[block] && deps[block].modules || []
	const async = /@(async|defer)/gi
	const node = page.nodes && page.nodes[block]
	const data = { name: block, attrs: ( node && node.attrs || {} ), tag: ( node && node.tag || '' ) }


	// Check all deps modules

	modules.forEach( obj => {

		if ( !obj || obj.constructor !== Object )
			return console.log( `Dependency module must be a object!` )

		const from = obj.from
		const items = Array.isArray( obj[type] ) ? obj[type] : [ obj[type] ]
		const filter = typeof obj.filter === 'function' ? obj.filter : false


		// Parse imports

		if ( type === 'import' ) {

			items.forEach( item => {

				if ( typeof item !== 'string' ) return

				if ( isExternal( from ) ) return

				item = item.replace( async, '' )

				if ( ! extnames.includes( path.extname( item ) ) ) return

				const file = path.join( from, item )

				if ( filter && page ) {
					let checkFilter = filter( file, data, page.name, type )
					if ( !checkFilter ) return
				}

				if ( ! checkFile( file, block, item, isDev ) ) return

				if ( imports.indexOf( file ) === -1 ) imports.push( file )

			})

		}


		// Parse injects

		if ( type === 'inject' ) {

			const scripts = page.scripts
			const styles = page.styles
			const assets = page.assets

			items.forEach( item => {

				if ( typeof item !== 'string' ) return

				const file = isExternal( from ) ? ( from + item ) : path.join( from, item ).replace( async, '' )

				if ( filter && page ) {
					let checkFilter = filter( file, data, page.name, type )
					if ( !checkFilter ) return
				}

				if ( isExternal( from ) ) {

					const extname = path.extname( item.replace( async, '' ) )

					if ( extname === '.js'  && scripts.indexOf( file ) === -1 ) scripts.push( file )
					if ( extname === '.css' && styles.indexOf( file )  === -1 ) styles.push( file )

				} else {

					const name = path.basename( file )
					const extname = path.extname( file )

					if ( ! checkFile( file, block, item, isDev ) ) return

					if ( extname === '.js' && scripts.indexOf( name ) === -1 ) scripts.push( name )
					if ( extname === '.css' && styles.indexOf( name ) === -1 ) styles.push( name )
					if ( assets.indexOf( file ) === -1 ) assets.push( file )

				}

			})

		}


	})

}

