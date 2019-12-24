
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const { isExternal } = require( './is' )


/**
 * Try resolving urls with @import directive.
 *
 * https://github.com/sass/node-sass#importer--v200---experimental
 *
 * @param {String} url - the path in import as-is
 * @param {String} prev - the previously resolved path
 * @param {Function} done - a callback function to invoke on async completion
 * 
 * @return {Function}
 */

module.exports = function ( url, prev, done ) {

	if ( this.options.file !== prev ) {
		url = path.join( path.dirname( prev ), url )
	}

	const file = path.resolve( path.dirname( this.options.file ), url )

	try {

		const data = fs.readFileSync( file );
		const css = data.toString().replace( /url\((.+?)\)/g, ( str, val ) => {

			val = val.replace( /'|"/g, '' )

			if ( isExternal( val ) ) return `url('${val}')`

			const newUrl = path.join( path.dirname( url ), val )

			return `url('${newUrl}')`

		})

		return done( { contents: css } )

	} catch(e) {
		console.log('sassResolver error: ', e)
		return done(e)
	}

}

