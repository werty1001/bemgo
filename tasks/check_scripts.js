
'use strict';


// Export

module.exports = ( task, core ) => {


	let imports = {}, relative = core.path.relative( core.path.TEMP, core.path.BLOCKS );


	// Check files

	Object.keys( core.tree ).forEach( ( page ) => {

		if ( ( ! core.config.options.jsBundles || core.isDevelopment ) && page !== 'app' ) return;

		if ( ! imports[page] ) imports[page] = [];

		Object.keys( core.tree[page] ).forEach( ( key ) => {

			let block = core.bem.getBlock( key );

			core.levels.forEach( ( level ) => {

				let el = core.path.join( level, block, key + core.config.extnames.scripts );

				if ( core.checkFile( core.path.blocks( el ) ) ) {

					let file = core.path.join( relative, el );
					
						if ( imports[ page ].indexOf( file ) === -1 ) imports[ page ].push( file );
				}

				core.tree[page][key].forEach( ( mod ) => {

					let elMod = core.path.join( level, block, mod + core.config.extnames.scripts );

					if ( core.checkFile( core.path.blocks( elMod ) ) ) {

						let file = core.path.join( relative, elMod );
						
							if ( imports[ page ].indexOf( file ) === -1 ) imports[ page ].push( file );
					}

				});

			});

		});

	});


	// Write files

	Object.keys( imports ).forEach( ( page ) => {

		let content = '', file = core.path.temp( page + core.config.extnames.scripts );

			imports[page].forEach( ( key ) => content += `${content === '' ? '' : '\n'}require('${key.replace( /\\/g, '\/' )}');` );

			core.writeFile( file, content );

	});


	return ( cb ) => cb();


};
