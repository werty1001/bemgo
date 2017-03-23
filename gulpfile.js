
'use strict';


// Require

const gulp = require( 'gulp' );
const core = require( './core/index.js' );


// Lazy task

const lazyTask = ( name, file, data = {} ) => {

	if ( ! name || ! file ) return console.log( 'You need to specify task name and file!' );

	data.name = name;
	data.file = file;

	return gulp.task( data.name, function( cb ) {

		let call = require( data.file ).call( this, data, core );

		return call( cb );

	});

};


// Read tasks

core.readDir( core.path.TASKS ).forEach( ( file ) => {

	if ( core.getExtname( file ) !== '.js' ) return;

	return lazyTask( core.getBasename( file ), core.path.tasks( file ) );

});


// Default task ( the sequence is important )

gulp.task( 'default',
	gulp.series( 'del',
		gulp.parallel( 'templates' ),
		gulp.parallel( 'parser' ),
		gulp.parallel( 'check_styles', 'check_scripts', 'symbol' ),
		gulp.parallel( 'styles', 'scripts', 'favicons' ),
		gulp.parallel( 'assets', 'fonts', 'img' ),
		gulp.parallel( 'browsersync', 'watch' )
	)
);

