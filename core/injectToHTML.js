
'use strict'


// Require

const fs = require( 'fs' )
const path = require( 'path' )
const { isExternal, isFile } = require( './is' )


/**
 * Append styles and scripts and symbol to HTML code.
 *
 * @param {String} code
 * @param {Object} page
 * @param {Object} task
 *
 * @return {String}
 */

module.exports = function ( code, page, task ) {

	const { paths, config, store, isDev, mainBundle } = task

	const withGap = /(\s+)?(<!--(\s+)?GAP:([\w]+)(\s+)?-->)/gi
	const comment = /(\s+)?(<!--(\s+)?BEMGO:([\w]+)(\s+)?-->)/gi
	const pattern = /@(async|defer)/gi
	const newLine = /(?:\r\n|\r|\n)/g
	const version = !isDev && config.build.addVersions ? `?v=${Date.now()}` : ''
	const favicons = []
	const arrays = {
		scripts: [],
		styles: [],
	}


	if ( isDev ) {

		page.styles.unshift( `${mainBundle}.css` )
		page.scripts.push( `${mainBundle}.js` )

	} else {

		const bundles = config.build.bundles
		const style = ( bundles.includes( 'css' ) ? page.name : mainBundle ) + '.min.css'
		const script = ( bundles.includes( 'js' ) ? page.name : mainBundle ) + '.min.js'

		if ( isFile( path.join( paths._styles, style ) ) ) page.styles.unshift( style )
		if ( isFile( path.join( paths._scripts, script ) ) ) page.scripts.push( script )

	}


	// Prepare scripts

	page.scripts.forEach( src => {

		let script = '<script src="[src]"[attr]></script>'
		let attrs = ''

		if ( /@async/gi.test( src ) ) attrs += ' async'
		if ( /@defer/gi.test( src ) ) attrs += ' defer'

		if ( !isExternal( src ) ) src = `${config.build.HTMLRoot}${config.dist.scripts}/${src}`

		script = script.replace( '[src]', src.replace( pattern, '' ) + ( isExternal( src ) ? '' : version ) ).replace( '[attr]', attrs )

		if ( arrays.scripts.indexOf( script ) === -1 ) arrays.scripts.push( script )
	})


	// Prepare styles

	page.styles.forEach( href => {

		let style = '<link rel="stylesheet" href="[href]">'

		if ( !isExternal( href ) ) href = `${config.build.HTMLRoot}${config.dist.styles}/${href}`

		style = style.replace( '[href]', href.replace( pattern, '' ) + ( isExternal( href ) ? '' : version ) )
		
		if ( arrays.styles.indexOf( style ) === -1 ) arrays.styles.push( style )
	})


	// Prepare favicons

	if ( !isDev ) {

		const head = {
			favicon: 'favicon.ico',
			favicon16: 'favicon-16x16.png',
			favicon32: 'favicon-32x32.png',
			manifest: 'manifest.json',
			browserconfig: 'browserconfig.xml',
			apple: 'apple-touch-icon.png',
			pinned: 'safari-pinned-tab.svg',
		}

		if ( isFile( path.join( paths._favicons, head.browserconfig ) ) )
			favicons.push( `<meta name="msapplication-config" content="${config.build.HTMLRoot}${config.dist.favicons}/${head.browserconfig}">` )

		if ( isFile( path.join( paths._favicons, head.favicon ) ) )
			favicons.push( `<link rel="shortcut icon" href="${config.build.HTMLRoot}${config.dist.favicons}/${head.favicon}" type="image/x-icon">` )

		if ( isFile( path.join( paths._favicons, head.favicon16 ) ) )
			favicons.push( `<link rel="icon" href="${config.build.HTMLRoot}${config.dist.favicons}/${head.favicon16}" sizes="16x16" type="image/png">` )

		if ( isFile( path.join( paths._favicons, head.favicon32 ) ) )
			favicons.push( `<link rel="icon" href="${config.build.HTMLRoot}${config.dist.favicons}/${head.favicon32}" sizes="32x32" type="image/png">` )

		if ( isFile( path.join( paths._favicons, head.apple ) ) )
			favicons.push( `<link rel="apple-touch-icon" href="${config.build.HTMLRoot}${config.dist.favicons}/${head.apple}" sizes="180x180">` )

		if ( isFile( path.join( paths._favicons, head.pinned ) ) )
			favicons.push( `<link rel="mask-icon" href="${config.build.HTMLRoot}${config.dist.favicons}/${head.pinned}" color="${config.app && config.app.safariPinnedTab || '#424b5f'}">` )

		if ( isFile( path.join( paths._favicons, head.manifest ) ) )
			favicons.push( `<link rel="manifest" href="${config.build.HTMLRoot}${config.dist.favicons}/${head.manifest}">` )

	}


	// Inject

	let injected = code

	injected = injected.replace( comment, ( str, indent, com, space, name ) => {

		if ( !indent ) indent = ''

		indent = '\n' + indent.replace( newLine, '' )
		name = name.trim().toLowerCase()

		let instead = ''

		if ( arrays[name] && arrays[name].length > 0 ) {
			instead = indent + arrays[name].join( indent )
		}

		if ( name === 'symbol' ) {
			instead = indent + ( store.svg || com )
		}

		if ( name === 'favicons' ) {
			instead = indent + favicons.join( indent )
		}

		return instead

	})


	// Add gap

	injected = injected.replace( withGap, ( str, indent, com, space, name ) => {

		if ( !indent ) indent = ''

		indent = '\n\n\n' + indent.replace( newLine, '' )

		return indent + `<!-- ${name.trim()} -->`

	})


	// Replace paths

	injected = injected.replace( /(,|'|"|`| )@([\w-]+)/gi, ( str, quote, block ) => {

		const paths = {
			styles: config.dist.styles,
			symbol: path.join( config.dist.symbol, 'symbol.svg' ),
			scripts: config.dist.scripts,
			static: config.dist.static,
			favicons: config.dist.favicons,
		}

		const dist = paths[block] || `${paths.static}/${block}`

		return `${quote}${config.build.HTMLRoot}${dist}`
	})


	return injected

}

