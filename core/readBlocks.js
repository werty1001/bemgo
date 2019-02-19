
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const { isDirectory, isFile, isExternal } = require( './is' )


/**
 * Check all blocks and read jsons & deps then sort levels and write map.
 *
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( task ) {


	// Options

	const { paths, store, config, notify } = task
	const levels = ( store.levels = [] )
	const jsons = ( store.jsons = {} )
	const deps = ( store.deps = {} )

	const root = paths._root
	const blocks = paths._blocks
	const sortLevels = config.levels
	const pugMap = config.build.pugMap
	const mapPath = pugMap ? path.join( root, pugMap ) : false
	const template = config.use.templates

	try {

		let writeMap = ( mapPath && template === '.pug' )
		let mapContent = ''

		// Read blocks

		fs.readdirSync( blocks ).forEach( level => {

			if ( !isDirectory( paths.blocks( level ) ) ) return

			levels.push( level )

			fs.readdirSync( paths.blocks( level ) ).forEach( block => {

				const json = paths.blocks( level, block, 'data.json' )
				const  use = paths.blocks( level, block, 'deps.js' )

				if ( !isDirectory( paths.blocks( level, block ) ) ) return

				if ( writeMap ) fs.readdirSync( paths.blocks( level, block ) ).forEach( file => {

					if ( path.extname( file ) !== template ) return

					if ( path.basename( file, path.extname( file ) ) === 'layout' ) return

					file = path.join( path.relative( path.dirname( mapPath ), blocks ), level, block, file )
					
					mapContent += ( mapContent === '' ? '' : '\n' ) + `include ${file}`

				})

				// Read json

				if ( isFile( json ) ) {

					try {

						const data = JSON.parse( fs.readFileSync( json ) )

						if ( !jsons[block] )
							jsons[block] = data
						else
							jsons[block] = Object.assign( jsons[block], data )

					} catch (e) {
						throw new Error( `\n\n\x1b[41mFAIL\x1b[0m: A JSON "\x1b[36m${path.join( level, block, 'data.json' )}\x1b[0m" have SyntaxError:\n${e.message}\n\n` )
					}

				}

				// Read deps

				if ( isFile( use ) ) {

					delete require.cache[ require.resolve( use ) ]

					const data = require( use )

					if ( data && Array.isArray( data.modules ) ) {

						data.modules.forEach( obj => {

							if ( !obj || obj.constructor !== Object ) return

							if ( !obj.from || typeof obj.from !== 'string' )
								return ( obj.from = path.join( blocks, level, block, 'assets' ) )

							if ( isExternal( obj.from ) ) return

							return ( obj.from = path.join( root, obj.from ) )
						})

					}

					if ( !deps[block] ) {

						if ( data ) deps[block] = {
							nodes: Array.isArray( data.nodes ) ? data.nodes : [],
							modules: Array.isArray( data.modules ) ? data.modules : []
						}

					} else {

						if ( data ) deps[block] = {
							nodes: Array.isArray( data.nodes ) ? deps[block].nodes.concat( data.nodes ) : deps[block].nodes,
							modules: Array.isArray( data.modules ) ? deps[block].modules.concat( data.modules ) : deps[block].modules
						}

					}

				}

			})

		})


		// Sort levels

		levels.sort( ( one, two ) => {

			const a = sortLevels && sortLevels[one] || 2
			const b = sortLevels && sortLevels[two] || 2

			if ( a > b ) return 1
			if ( a < b ) return -1

		})


		// Write map

		if ( writeMap ) {

			if ( !isDirectory( path.dirname( mapPath ) ) ) fs.mkdirSync( path.dirname( mapPath ) )

			fs.writeFileSync( mapPath, mapContent, 'utf8' )

		}


	} catch (e) {

		console.log(e)
		notify.onError( 'Error' )(e)

	}

}

