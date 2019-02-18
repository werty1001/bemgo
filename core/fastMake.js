
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const BEM = require( './bem' )

const { paths, config, notify } = require( './index' )
const { isDirectory, isFile  } = require( './is' )


/**
 * Fast make blocks with files and folders.
 */

module.exports = {

	sep: Array(16).join( '-' ),
	message: '',

	setType ( argv ) {
		this.type = ( argv[2] === 'page' ) ? argv[2] : 'node'
	},

	setItems ( argv ) {

		let items = argv.slice( ( this.type === 'page' ? 3 : 2 ) )

		this.items = items.filter( ( el, i ) => items.indexOf( el ) === i )

	},

	setLevel ( argv ) {

		let level

		this.items.some( el => {

			if ( el[0] === ':' ) return ( level = el )

			return false
		})

		if ( level ) {

			this.items = this.items.slice( 0, this.items.indexOf( level ) )
			level = level.slice(1)

		} else {

			level = config.build.mainLevel
		}

		this.level = level

	},

	checkDirs () {

		try {

			const app = paths._app
			const pages = paths._pages
			const blocks = paths._blocks
			const level = path.join( blocks, this.level )

			if ( ! isDirectory( app ) ) fs.mkdirSync( app )
			if ( ! isDirectory( pages ) ) fs.mkdirSync( pages )
			if ( ! isDirectory( blocks ) ) fs.mkdirSync( blocks )
			if ( ! isDirectory( level ) ) fs.mkdirSync( level )

		} catch(e) {

			console.log(e)
			notify.onError( 'Error' )(e)

		}

	},

	addMessage( str ) {

		if ( typeof str !== 'string' ) return

		const newLine = this.message === '' ? '' : '\n'

		this.message += ( newLine + str )

	},

	addPage ( name ) {

		const extname = path.extname( name ) || config.use.templates
		const basename = path.basename( name, extname )
		const file = paths.pages( basename + extname )
		const content = ( config.addContent && config.addContent.page || '' ).replace( /\[name\]/g, basename )

		return this.addFile( file, content )

	},

	addNode ( node, extra ) {

		const block = BEM.getBlock( node )
		const directory = paths.blocks( this.level, block )

		if ( ! isDirectory( directory ) ) this.addDirectory( directory )

		extra = Array.isArray( extra ) ? extra : [extra]

		extra.forEach( item => {

			if ( !item || !item.trim() || typeof item !== 'string' ) return

			item = item.trim().toLowerCase()

			const isFile = ( item[0] === '.' || path.extname( item ) )

			if ( !isFile ) {

				let prev = directory

				return item.split( path.sep ).forEach( dir => {

					if ( !dir || !dir.trim() || typeof dir !== 'string' ) return

					const where = path.join( prev, dir )

					this.addDirectory( where )

					prev = where

				})

			}

			let extname = path.extname( item ) || item
			let name = path.basename( item, extname ) || ( extname === '.json' ? 'data' : node )
			let content = ( config.addContent && config.addContent[ extname.slice(1) ] || '' ).replace( /\[name\]/g, name )
			let file = path.join( directory, name + extname )

			if ( ( name + extname ) === 'deps.js' ) content = config.addContent && config.addContent.deps || ''

			return this.addFile( file, content )

		})

	},

	addDirectory ( dir ) {

		const where = path.relative( paths._blocks, dir ).replace( '..', '' )

		if ( isDirectory( dir ) )
			return this.addMessage( `\x1b[41mFAIL\x1b[0m: Directory "\x1b[36m${where}\x1b[0m" already exist!` )

		fs.mkdirSync( dir )

		this.addMessage( `\x1b[42mGOOD\x1b[0m: Directory "\x1b[36m${where}\x1b[0m" successfully created!` )

	},

	addFile ( file, content ) {

		const where = path.relative( paths._blocks, file ).replace( '..', '' )
		const what = this.type === 'page' ? 'Page' : 'File'

		if ( isFile( file ) )
			return this.addMessage( `\x1b[41mFAIL\x1b[0m: ${what} "\x1b[36m${where}\x1b[0m" already exist!` )

		fs.writeFileSync( file, content, 'utf8' )

		this.addMessage( `\x1b[42mGOOD\x1b[0m: ${what} "\x1b[36m${where}\x1b[0m" successfully created!` )

	},

	parseArguments ( argv, showMessage = true ) {

		this.setType( argv )
		this.setItems( argv )
		this.setLevel( argv )
		this.checkDirs()

		if ( this.items.length === 0 ) {

			this.status = false
			this.message = `\x1b[41mFAIL\x1b[0m: You must write a \x1b[36m${this.type}\x1b[0m name!`

		} else {

			try {

				this.items.forEach( item => {

					let name = item.split( '[' )[0]
					let more = ( item.split( '[' )[1] || '' ).replace( ']', '' )
					let extra = more.split( ',' )

					name = name.trim().toLowerCase()

					if ( this.type === 'page' ) return this.addPage( name )

					if ( config.fastMake && config.fastMake[more] ) extra = config.fastMake[more]

					return this.addNode( name, extra )

				})

			} catch(e) {

				console.log(e)
				notify.onError( 'Error' )(e)

			}

		}

		if ( this.message && showMessage )
			console.log( `\x1b[1mTry add ${this.type}\x1b[0m:\n${this.sep}\n${this.message}\n${this.sep}\n` )

	}

}

