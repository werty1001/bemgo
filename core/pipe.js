
'use strict'


// Require

const through = require( 'through2' )
const PluginError = require( 'plugin-error' )


/**
 * Run `handler` for every file in pipe.
 *
 * @param {Function} handler
 * @param {Object} options
 * @param {String} handlerName
 *
 * @return {Object}
 */

module.exports = function ( handler, options, handlerName ) {

	const name = ( handlerName || handler && handler.displayName || 'core:pipe' )

	if ( typeof handler !== 'function' ) return through.obj()

	return through.obj( function ( file, enc, cb ) {

		if ( file.isStream() ) return cb( new PluginError( name, 'Streaming not supported' ) )

		if ( file.isBuffer() ) {

			try {

				handler( file, options )

			} catch (e) {

				return cb( new PluginError( name, e ) )
			}

		}

		return cb( null, file )

	})

}

