
'use strict'


// Require

const path = require( 'path' )
const htmlparser = require( 'htmlparser2' )
const parseXlink = require( './parseXlink' )
const parseAsset = require( './parseAsset' )
const parseClass = require( './parseClass' )
const parseDeps = require( './parseDeps' )
const injectToHTML = require( './injectToHTML' )


/**
 * Parse HTML code from the given `file`.
 *
 * @param {Object} file
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( file, task ) {


	const { paths, store, isDev, config } = task

	const name = path.basename( file.path, path.extname( file.path ) )
	const code = String( file.contents )

	const page = ( store.pages[name] = {
		name: name,
		nodes: {},
		styles: [],
		scripts: [],
		symbol: [],
		assets: [],
	})


	// Start parse

	const parse = new htmlparser.Parser({
		onopentag ( tag, attrs ) {


			// Parse use tag

			if ( tag === 'use' ) return parseXlink( attrs[ 'xlink:href' ], page, paths )


			// Parse assets from attrs

			if ( !isDev ) Object.keys( attrs ).forEach( attr => parseAsset( attrs[attr], page, paths ) )


			// Parse classes

			if ( typeof attrs.class === 'string' ) {

				const mix = []

				attrs.class.split( ' ' ).forEach( cls => {
					cls = cls.trim()
					parseClass( cls, page, mix, attrs, tag )
					parseDeps( cls, page, store.deps, task )
				})

			}


		},

		onend () {

			if ( !isDev ) return

			const injected = injectToHTML( code, page, task )		

			file.contents = Buffer.from( injected )

		},

	}, { decodeEntities: true })

	parse.write( code )
	parse.end()

}

