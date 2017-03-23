
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	task.src = core.isDevelopment ? [ core.path.blocks( '*/*/fonts/*.{eot,svg,ttf,woff,woff2}' ) ] : core.used.fonts;

	task.dest = ( file ) => {

		let array = file.path.split( core.path.SEP );

			file.path = core.path.join( file.base, array[ array.length - 1 ] );
			
			return core.path.FONTS;
	};


	return ( cb ) => {

		if ( ! task.src.length > 0 ) return cb();

		return gulp.src( task.src, {since: gulp.lastRun( task.name )} )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( gulp.dest( task.dest ) );

	}


};
