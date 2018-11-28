
'use strict';


// Require

const fs = require( 'fs' );
const path = require( 'path' );


// Core

const core = {};


// Config

core.config = {};

try {

	let assign = true,
		configDef = require( path.join( __dirname, 'config.js' ) ),
		configApp = path.join( __dirname, '..', 'app', 'config.js' );

	try { fs.statSync( configApp ); } catch(e) { assign = false; }

	if ( assign ) {

		let app = require( configApp );

		Object.keys( app ).forEach( ( key ) => {

			if ( ! configDef[key] ) return configDef[key] = app[key] || '';

			let _old = configDef[key],
				_new = app[key],
				_oldType = Array.isArray( _old ) ? 'array' : ( typeof _old === 'object' && _old !== null ) ? 'object' : typeof _old,
				_newType = Array.isArray( _new ) ? 'array' : ( typeof _new === 'object' && _new !== null ) ? 'object' : typeof _new;

			if ( _oldType !== _newType )
				return console.log( `Type of '${key}' must be ${_oldType}!` );
			
			if ( _oldType === 'array' )
				return configDef[key] = _old.concat( _new.filter( val => _old.indexOf( val ) < 0 ) );

			if ( _oldType === 'object' )
				return configDef[key] = Object.assign( {}, _old, _new );

			configDef[key] = _new;

		});

	}

	core.config = configDef;

} catch(e) { console.log(e); }


// Paths

let paths = {

	root: '..',
	dist: 'dist',
	tasks: 'tasks',
	core: 'core',
	temp: 'core/temp',
	app: 'app',
	blocks: 'app/blocks',
	pages: 'app/pages'

};

core.path = {

	SEP: path.sep,
	DESKTOP: path.join( ( process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE ), 'Desktop' ),

	relative: ( one = '', two = '' ) => path.relative( one, two ),
	join: ( one = '', two = '', three = '', four = '' ) => path.join( one, two, three, four )

};

Object.keys( paths ).forEach( ( key ) => {

	if ( typeof key !== 'string' ) return;

	if ( key === 'root' )
		core.path[key] = ( myPath = '' ) => path.join( __dirname, paths[key], myPath );
	else
		core.path[key] = ( myPath = '' ) => core.path.root( path.join( paths[key], myPath ) );

	core.path[ key.toUpperCase() ] = core.path[key]();

});

Object.keys( core.config.dist ).forEach( ( key ) => {

	if ( typeof key !== 'string' ) return;

	core.path[key] = ( myPath = '' ) => core.path.dist( path.join( core.config.dist[ key ], myPath ) );

	core.path[ key.toUpperCase() ] = core.path[key]();

});


// Add temp dir

try {

	fs.lstatSync( core.path.TEMP );

} catch (e) {

	try {

		fs.mkdirSync( core.path.TEMP );

	} catch (e) { console.log(e); }

}


// Levels

core.levels = [];


// Tree

core.tree = {};


// Used

core.used = {};


// Environment

core.isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


// Port

core.port = process.env.port ? process.env.port : 3000;


// Zip

core.zipDev = !!process.env.ZIP_DEV;



//
// Helpers
//


// Bem helpers

core.bem = {

	isBlock: function( cls ) {
		return ( ! this.isElement( cls ) && ! this.isModifier( cls ) );
	},

	isElement: function( cls ) {
		return ( /([a-zA-Z0-9])__([a-zA-Z0-9])/i.test( cls ) && ! this.isModifier( cls ) );
	},

	isModifier: function( cls ) {
		return ( /([a-zA-Z0-9])_([a-zA-Z0-9])/i.test( cls ) || /([a-zA-Z0-9])--([a-zA-Z0-9])/i.test( cls ) );
	},

	delModifier: function( cls ) {
		if ( /([a-zA-Z0-9])--([a-zA-Z0-9])/i.test( cls ) ) return cls.split( '--' )[0];
		let isElement = cls.match( /^[a-zA-Z0-9-]+__[a-zA-Z0-9-]+/ )
		if ( isElement ) return isElement[0]
		return cls.split( '_' )[0]
	},

	getBlock: function( cls ) {
		let el = this.delModifier( cls );
		return el.split( '__' )[0];
	}

};


// Get date

core.getDate = () => {

	let now = new Date(),
		year = now.getFullYear(),
		month = ( '0' + ( now.getMonth() + 1 ) ).slice(-2),
		day = ( '0' + now.getDate() ).slice(-2),
		hours = ( '0' + now.getHours() ).slice(-2),
		minutes = ( '0' + now.getMinutes() ).slice(-2);

	return `${year}-${month}-${day}__${hours}-${minutes}`;

};


// Get extname

core.getExtname = ( file ) => path.extname( file );


// Get basename

core.getBasename = ( file, extname = false ) => extname ? path.basename( file ) : path.basename( file, path.extname( file ) );


// Check file

core.checkFile = ( file ) => {
	
	let check = true;

	try {

		fs.statSync( file );

	} catch (e) { check = false; }

	return check;
};


// Add dir

core.addDir = ( dir ) => {

	try {

		fs.mkdirSync( dir );

	} catch (e) { console.log(e); }

};


// Check dir

core.isDirectory = ( dir ) => {

	let exist = false;

	try {

		exist = fs.lstatSync( dir );

	} catch (e) {}

	return exist ? exist.isDirectory() : exist;

};


// Read dir

core.readDir = ( dir ) => {

	let array = [];

	try {

		array = fs.readdirSync( dir );

	} catch (e) { console.log(e); }

	return array;

};


// Write file

core.writeFile = ( file, content ) => {

	try {

		fs.writeFileSync( file, content, 'utf8' );

	} catch (e) { console.log(e); }

};


// Read file

core.readFile = ( file ) => {

	let data = '';

	try {

		data = fs.readFileSync( file ).toString();

	} catch (e) { console.log(e); }

	return data;

};


// Ignore node

core.isIgnoreNode = ( node ) => {

	let list = core.config.autoCreateIgnore;

		list = Array.isArray( list ) ? list : [list];

	if ( ! node || ! list.length > 0 ) return false;

	if ( list.indexOf( node ) !== -1 ) return true;

	for( let i = 0; i<list.length; i++ ) {

		if( list[i] instanceof RegExp && node.search( list[i] ) !== -1 ) return true;

	}

	return false;

};



//
// For tasks
//


// Error handler

core.errorHandler = ( err ) => {

	console.log( err.toString() );

	return require( 'gulp-notify' ).onError( 'Error' )( err );

};


// Pretty fix

core.prettyFix = ( file ) => {

	let html = file.contents.toString();

		html = html.replace( /\/>/gi, '>' ).replace( /(<[A-Z][A-Z0-9]*\b[^>]*>)([^<>]*)(<\/[A-Z][A-Z0-9]*>)/gi, ( str, start, content, end ) => {
	
			let tag = start.replace( /<|>/gi, '' ).split(' ')[0],
				selfClosing = ['img', 'input', 'hr', 'br', 'wbr', 'source', 'area', 'col', 'colgroup', 'meta', 'link'];

			return start + ( selfClosing.indexOf( tag ) === -1 ? content.trim() : content ) + end;
		});

	file.contents = new Buffer( html );

	return core.path.DIST;

};


// Resolver url

core.sassResolver = function( url, prev, done ) {

	let file;

	if ( this.options.file !== prev )
		url = path.join( path.dirname( prev ), url );

	file = path.resolve( path.dirname( this.options.file ), url );

	fs.readFile( file, ( err, data ) => {

		if ( err ) return done( err );

		let css = data.toString().replace( /url\((.+?)\)/g, ( str, val ) => {

			val = val.replace( /'|"/g, '' );

			if ( /^(?:https?\:)?\/\//i.test( val ) ) return `url('${val}')`;

			let newUrl = path.join( path.dirname( url ), val );

				return `url('${newUrl}')`;

		});

		return done( { contents: css } );

	});

	return;

};


// Edit url

core.editUrl = ( url ) => {

	if ( ! url || /^(?:https?\:)?\/\//i.test( url ) || url.indexOf( 'data:' ) === 0 || url.charAt(0) === '#' ) return;

	let array = url.split( path.sep ),
		block = array[ array.length - 3 ],
		name = array[ array.length - 1 ],
		asset = path.resolve( core.path.TEMP, url.split( '?' )[0] );


	if ( url.indexOf( 'fonts/' ) !== -1 ) {

		if ( core.used.fonts.indexOf( asset ) === -1 ) core.used.fonts.push( asset );

		return path.join( path.relative( core.path.STYLES, core.path.FONTS ), path.basename( url ) );
		
	}

	if ( url.indexOf( 'img/sprite/' ) !== -1 ) {

		if ( ! core.isDevelopment ) return url;

		block = 'sprite_' + array[ array.length - 4 ];

	}

	if ( core.used.imgs.indexOf( asset ) === -1 ) core.used.imgs.push( asset );

	return path.join( path.relative( core.path.STYLES, core.path.IMG ), `${block}_${name}` );

};


// Get entry

core.getEntry = () => {

	let entry = {};

	try {

		fs.readdirSync( core.path.TEMP ).forEach( ( val ) => {

			let extname = path.extname( val ),
				file = path.basename( val, extname );

				if ( file && extname !== core.config.extnames.scripts ) return;

				entry[ file ] = core.path.temp( val );

				if ( ! core.isDevelopment ) entry[ `${file}.min` ] = entry[ file ];

		});

	} catch (e) { console.log(e); }

	return entry;

};


// Read blocks

core.readBlocks = () => {

	let map = '', data = {};

	core.readDir( core.path.BLOCKS ).forEach( ( level ) => {

		let levelDir = path.join( core.path.BLOCKS, level );

		if ( ! core.isDirectory( levelDir ) ) return;

		core.readDir( levelDir ).forEach( ( block ) => {

			let blockDir = path.join( levelDir, block ),
				dataFile = path.join( levelDir, block, 'data.json' );

			if ( ! core.isDirectory( blockDir ) ) return;

			if ( core.config.extnames.templates === '.pug' ) {

				core.readDir( blockDir ).forEach( ( file ) => {

					if ( path.extname( file ) !== '.pug' ) return;

					let include = path.join( path.relative( core.path.TEMP, core.path.BLOCKS ), level, block, file );
						map += `${map === '' ? '' : '\n'}include ${include}`;

				});

			}

			core.writeFile( core.path.temp( 'blocks' + core.config.extnames.templates ), map );

			try {

				data[block] = JSON.parse( fs.readFileSync( dataFile ) );

			} catch (e) {}

		});
		
	});

	return data;

};


// Add file

core.addFile = ( data, type ) => {

	let extnames = {
		json: '.json',
		style: core.config.extnames.styles,
		script: core.config.extnames.scripts,
		template: core.config.extnames.templates,
		page: core.config.extnames.templates
	};

	data = Array.isArray( data ) ? data : [data];

	data.forEach( ( val ) => {

		if ( ! val || typeof val !== 'string' ) return;

		let block = core.bem.getBlock( val ),
			content = core.config.add[ type ] || '',
			dir = ( type === 'page' ) ? core.path.app( 'pages' ) : core.path.blocks( core.path.join( core.config.mainLevel, block ) ),
			name = ( type === 'json' ) ? 'data' : val,
			file = core.path.join( dir, name + extnames[ type ] ),
			comment = ( name === block ) ? `\n/*!*\n * ${block.charAt(0).toUpperCase() + block.slice(1)}\n */\n` : '';

			if ( core.checkFile( file ) ) return;

			if ( ! core.isDirectory( dir ) ) core.addDir( dir );

			content = content.replace( /\[comment\]/g, comment ).replace( /\[name\]/g, name );

			core.writeFile( file, content );
	});

};


// Add block

core.addBlock = ( data, content = false ) => {

	data = Array.isArray( data ) ? data : [data];

	data.forEach( ( item ) => {

		if ( ! item || typeof item !== 'string' ) return;

		item = item + ( content ? `:${content}` : '' );

		let array = item.split( ':' ),
			block = array[0],
			dir = core.path.blocks( core.path.join( core.config.mainLevel, block ) );

			if ( ! core.isDirectory( dir ) ) core.addDir( dir );

			array.forEach( ( val ) => {

				if ( typeof val !== 'string' || val === block ) return;

				if ( [ 'img', 'fonts', 'assets' ].indexOf( val ) !== -1 ) {

					let folder = core.path.join( dir, val );

					if ( ! core.isDirectory( folder ) ) core.addDir( folder );

				}

				if ( [ 'json', 'style', 'script', 'template' ].indexOf( val ) !== -1 ) core.addFile( block, val );

			});
	});

};


// Edit time

core.editTime = ( file ) => {

	if ( ! core.checkFile( file ) ) return;

	try {

		fs.utimesSync( file, ( Date.now() / 1000 ), ( Date.now() / 1000 ) );

	} catch (e) { console.log(e); }

};


// Change template

core.changeTemplate = ( file ) => {

	let name = core.getBasename( file );

		Object.keys( core.tree ).forEach( ( page ) => {

			if ( page === 'app' ) return;

			if ( name === 'layout' || core.tree[page][name] ) core.editTime( core.path.pages( page + core.config.extnames.templates ) );

		});

};


// Export

module.exports = core;

