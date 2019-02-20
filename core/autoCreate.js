
'use strict'


// Require

const path = require( 'path' )
const BEM = require( './bem' )
const fastMake = require( './fastMake' )


/**
 * Creating files and blocks automatically.
 *
 * @param {Object} task
 *
 * @return {undefined}
 */

module.exports = function ( task ) {

	const { paths, store, config, mainBundle } = task
	const tree = store.tree[mainBundle]
	const levels = config.autoCreate.levels
	const files = config.autoCreate.files


	if ( !tree || !files || !levels || levels.length === 0 ) return


	// Ignore

	const ignore = {

		nodes: config.autoCreate.ignoreNodes,
		style: config.autoCreate.ignoreStyle,
		script: config.autoCreate.ignoreScript,
		template: config.autoCreate.ignoreTemplate,

		getByExtname ( item ) {

			const extname = ( item[0] === '.' ? item : path.extname( item ) ).toLowerCase()

			if ( [ '.css', '.styl', '.less', '.scss', '.sass' ].includes( extname ) )
				return this.style

			if ( [ '.html', '.pug', '.jade', '.twig', '.hbs', '.mustache', '.haml', '.erb' ].includes( extname ) )
				return this.template

			if ( [ '.js', '.d.ts', '.ts', '.litcoffee', '.coffee', '.dart', '.clj', '.cljs', '.cljc', '.edn' ].includes( extname ) )
				return this.script

			return []
		}
	}


	// Is ignore

	const isNodeIgnored = function ( node, ignore ) {

		if ( !node || !ignore || ignore.length === 0 ) return false

		for ( let i = 0; i < ignore.length; i++ ) {

			if ( typeof ignore[i] === 'string' && node === ignore[i] ) return true

			if ( ignore[i] instanceof RegExp && node.search( ignore[i] ) !== -1 ) return true

		}

		return false

	}


	// Check tree

	Object.keys( tree ).forEach( node => {

		if ( isNodeIgnored( node, ignore.nodes ) ) return

		const nodes = [node].concat( tree[node] )

		levels.forEach( level => {

			const command = [ 0, 0 ]

			nodes.forEach( el => {

				if ( isNodeIgnored( el, ignore.nodes ) ) return

				const add = [].concat( BEM.isBlock( el ) ? config.autoCreate.folders : [] )

				files.forEach( item => {

					if ( !isNodeIgnored( el, ignore.getByExtname( item ) ) ) add.push( item )

				})

				if ( add.length > 0 ) command.push( `${el}[${add.join(',')}]` )

			})

			command.push( `:${level}` )

			fastMake.parseArguments( command, false )

		})

	})

}

