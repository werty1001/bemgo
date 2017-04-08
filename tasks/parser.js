
'use strict';


// Require

const htmlparser = require( 'htmlparser2' );


// Export

module.exports = ( task, core ) => {


	core.used.blocks = [];
	core.used.styles = [];
	core.used.scripts = [];
	core.used.assets = [];
	core.used.symbol = [];


	// Parser

	let parser = {

		pages: {},
		parsed: {},

		node: function( page, node ) {

			if ( this.pages[page][node].already ) return;

			this.pages[page][node].already = true;

			if ( ! this.parsed[page] ) this.parsed[page] = {};

			if ( this.pages[page][node]['mix'].length > 0 ) {

				this.pages[page][node]['mix'].forEach( ( mixNode ) => this.node( page, mixNode ) );

			}

			return this.parsed[page][node] = this.pages[page][node]['mod'];
		},

		attr: function( attr ) {

			if ( ! attr || attr.indexOf( 'data:' ) === 0 || /^(?:https?\:)?\/\//i.test( attr ) || attr.indexOf( core.config.dist.static + core.path.SEP ) === -1 ) return;

			attr = core.path.relative( core.config.dist.static, attr );

			let block = attr.split( core.path.SEP )[0];

			attr = attr.replace( block, block + core.path.SEP + 'assets' ).replace( / 2x| 3x| 4x/g, '' );

			let file = core.path.blocks( `*/${attr}` );

			if ( core.used.assets.indexOf( file ) === -1 ) core.used.assets.push( file );

		}

	};


	// Parse HTML files

	core.readDir( core.path.DIST ).forEach( ( file ) => {

		if ( core.getExtname( file ) !== '.html' ) return;

		let name = core.getBasename( file ),
			code = core.readFile( core.path.dist( file ) );

		if ( ! parser.pages[name]  ) parser.pages[name] = {};
		if ( ! parser.pages['app'] ) parser.pages['app'] = {};

		let newParser = new htmlparser.Parser({
			onopentag: function( tag, attrs ) {

				if ( tag === 'script' ) {

					if ( ! attrs.src || /^(?:https?\:)?\/\//i.test( attrs.src ) ) return;
					
					let file = core.getBasename( attrs.src, true );

					if ( file !== 'app.js' && core.used.scripts.indexOf( file ) === -1  ) core.used.scripts.push( file );

					return;
				}

				if ( tag === 'link' ) {

					if ( ( attrs.rel && attrs.rel !== 'stylesheet' ) || /^(?:https?\:)?\/\//i.test( attrs.href ) ) return;
					
					let file = core.getBasename( attrs.href, true );

					if ( file !== 'app.css' && core.used.styles.indexOf( file ) === -1  ) core.used.styles.push( file );

					return;
				}

				if ( tag === 'use' ) {

					let id = attrs['xlink:href'],
						icon = id ? id.split( '__' )[1] : '',
						block = id ? id.split( '__' )[0] : '',
						file;

					if ( ! icon || ! block ) return;

					block = block.charAt(0) === '#' ? block.slice(1) : block;
					file = core.path.blocks( `*/${block}/img/symbol/${icon}.svg` );

					if ( core.used.symbol.indexOf( file ) === -1  ) core.used.symbol.push( file );

					return;
				}

				core.config.assetsAttr.forEach( ( attr ) => parser.attr( attrs[ attr ] ) );

				let mix = [], classes = attrs.class ? attrs.class.split( ' ' ) : [];

				if ( classes.length < 1 ) return;

				classes.forEach( ( cls, i ) => {

					cls = cls.trim();

					let val, isModifier;

					if ( core.bem.isBlock( cls ) && core.used.blocks.indexOf( cls ) === -1 ) core.used.blocks.push( cls );

					if ( core.bem.isBlock( cls ) || core.bem.isElement( cls ) ) {
						val = cls;
						isModifier = false;
					} else {
						val = core.bem.delModifier( cls );
						isModifier = true;
					}

					if ( ! parser.pages[name][val] ) parser.pages[name][val] = { mod: [], mix: [] };
					if ( ! parser.pages['app'][val] ) parser.pages['app'][ val ] = { mod: [], mix: [] };

					if ( isModifier ) {

						let elMod = parser.pages[name][val]['mod'];
						let gMod = parser.pages['app'][val]['mod'];

						if ( elMod.indexOf( cls ) === -1 ) elMod.push( cls );
						if ( gMod.indexOf( cls ) === -1 ) gMod.push( cls );

					} else {

						let elMix = parser.pages[name][val]['mix'];
						let gMix = parser.pages['app'][val]['mix'];

						if ( i !== 0 ) {

							mix.forEach( ( node ) => {
								if ( elMix.indexOf( node ) === -1 ) elMix.push( node );
								if ( gMix.indexOf( node ) === -1 ) gMix.push( node );
							});

						}

						if ( mix.indexOf( cls ) === -1 ) mix.push( cls );

					}

				});

			}
		});

		newParser.write( code );
		newParser.end();

	});


	// Parse nodes

	Object.keys( parser.pages ).forEach( ( page ) => {
		Object.keys( parser.pages[page] ).forEach( ( node ) => parser.node( page, node ) );
	});


	// Add symbol block

	if ( ! core.config.blocks.app.symbol && ( core.isDevelopment || core.used.symbol > 0 ) ) core.config.blocks.app.symbol = '';


	// Add blocks from config

	Object.keys( core.config.blocks ).forEach( ( page ) => {

		if ( ! parser.parsed[page] ) return;

		Object.keys( core.config.blocks[page] ).forEach( ( node ) => {

			let array = Array.isArray( core.config.blocks[page][node] ) ? core.config.blocks[page][node] : [ typeof core.config.blocks[page][node] === 'string' ? core.config.blocks[page][node] : '' ];

			if ( ! parser.parsed[page][node] ) {

				parser.parsed[page][node] = array;

			} else {

				array.forEach( ( key ) => {
					if ( parser.parsed[page][node].indexOf( key ) === -1 ) parser.parsed[page][node].push( key );
				});

			}

		});

	});

	core.tree = parser.parsed;


	// Add styles from config

	let usedStyles = Array.isArray( core.config.use.styles ) ? core.config.use.styles : [core.config.use.styles];

	usedStyles.forEach( ( style ) => {

		if ( typeof style !== 'string' ) return;

		if ( style !== 'app.css' && core.used.styles.indexOf( style ) === -1  ) core.used.styles.push( style );

	});


	// Add scripts from config

	let usedScripts = Array.isArray( core.config.use.scripts ) ? core.config.use.scripts : [core.config.use.scripts];

	usedScripts.forEach( ( script ) => {

		if ( typeof script !== 'string' ) return;

		if ( script !== 'app.js' && core.used.scripts.indexOf( script ) === -1  ) core.used.scripts.push( script );

	});


	// Add symbol from config

	let usedSymbol = Array.isArray( core.config.use.symbol ) ? core.config.use.symbol : [core.config.use.symbol];

	usedSymbol.forEach( ( id ) => {

		if ( typeof id !== 'string' ) return;

		let icon = id ? id.split( '__' )[1] : '',
			block = id ? id.split( '__' )[0] : '',
			file;

			if ( ! icon || ! block ) return;

			block = block.charAt(0) === '#' ? block.slice(1) : block;
			file = core.path.app( `blocks/*/${block}/img/symbol/${icon}.svg` );

			if ( core.used.symbol.indexOf( file ) === -1  ) core.used.symbol.push( file );

	});


	// Add assets from config

	let usedAssets = Array.isArray( core.config.use.assets ) ? core.config.use.assets : [core.config.use.assets];

	usedAssets.forEach( ( item ) => {

		if ( typeof item !== 'string' ) return;

		let file, block = item.split( core.path.SEP )[0];

			item = item.replace( block, block + core.path.SEP + 'assets' );

			file = core.path.blocks( core.path.join( '*', item ) );

			if ( core.used.assets.indexOf( file ) === -1 ) core.used.assets.push( file );

	});


	// Update assets

	if ( core.used.styles.length > 0 ) core.used.assets.push(
		core.path.blocks( `*/*/assets/{${core.used.styles.join( ',' )}}` )
	);
	
	if ( core.used.scripts.length > 0 ) core.used.assets.push(
		core.path.blocks( `*/*/assets/{${core.used.scripts.join( ',' )}}` )
	);


	// Sort levels

	core.readDir( core.path.BLOCKS ).forEach( ( level ) => {

		if ( core.isDirectory( core.path.blocks( level ) ) ) core.levels.push( level );

	});

	core.levels.sort( ( one, two ) => {

		let a = core.config.levels[one] || 2,
			b = core.config.levels[two] || 2;

			if ( a > b ) return 1;
			if ( a < b ) return -1;
	});


	// Auto create files

	if ( core.config.autoCreate ) {

		Object.keys( core.tree.app ).forEach( ( node ) => {

			if ( core.isIgnoreNode( node ) ) return;

			let block = core.bem.getBlock( node ),
				levels = core.config.autoCreateCheckLevels,
				nodes = [node].concat( core.tree.app[node] ),
				add = {
					style: nodes,
					script: nodes,
					template: nodes
				};

				if ( levels.length > 0 ) {

					let ignore = {
						style: [],
						script: [],
						template: []
					};

					let extnames = {
						style: core.config.extnames.styles,
						script: core.config.extnames.scripts,
						template: core.config.extnames.templates
					};

					levels.forEach( ( level ) => {

						nodes.forEach( ( el ) => {

							let dir = core.path.blocks( core.path.join( level, block ) );

							Object.keys( add ).forEach( ( key ) => {

								let file = core.path.join( dir, el + extnames[key] );

									if ( core.checkFile( file ) && ignore[key].indexOf( el ) === -1 ) ignore[key].push( el );
							});

						});

					});

					Object.keys( add ).forEach( ( key ) => {
						add[key] = [].concat( nodes.filter( val => ignore[key].indexOf( val ) < 0 ) );
					});

				}

				Object.keys( add ).forEach( ( key ) => {
					if ( core.config.autoCreateAdd.indexOf( key ) !== -1 ) core.addFile( add[key], key );
				});

		});

	}


	return ( cb ) => cb();


};
