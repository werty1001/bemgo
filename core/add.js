
'use strict';


// Require

const core = require( './index.js' );


// Add

const add = {

	getType: ( array ) => array[ array.indexOf( 'add' ) + 1 ],

	getData: ( array ) => array.slice( array.indexOf( 'add' ) + 2 ),

	block: ( data ) => core.addBlock( data, core.config.add.block ),

	json: ( data ) => core.addFile( data, 'json' ),
	
	page: ( data ) => core.addFile( data, 'page' ),
	
	style: ( data ) => core.addFile( data, 'style' ),
	
	script: ( data ) => core.addFile( data, 'script' ),
	
	template: ( data ) => core.addFile( data, 'template' ),

	check: function( array ) {

		let type = this.getType( array ),
			data = this.getData( array ),
			err = '';

			if ( data.length > 0 && typeof this[ type ] === 'function' ) return this[ type ]( data );

			err += '\n\n!!! Unknown command \n\n###\n\n';
			err += 'Add header block: [npm run add block header]\n\n'; 
			err += 'Add data.json for page: [npm run add json page]\n\n';
			err += 'Add about page: [npm run add page about]\n\n';
			err += 'Add header__top.css for header: [npm run add style header__top]\n\n';
			err += 'Add slider.js for slider: [npm run add script slider]\n\n';
			err += 'Add template in footer block: [npm run add template footer] \n\n';
			err += '### \n\n';

			console.log( err );
	}

};

add.check( process.argv );

