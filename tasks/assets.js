
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	task.src = core.isDevelopment ? [ core.path.blocks( '*/*/assets/**/*.*' ) ] : core.used.assets;

	task.dest = ( file ) => {

		let array = file.path.split( core.path.SEP ),
			name = array[ array.length - 1 ];
			
			if ( core.getExtname( file.path ) === '.js' ) {

				file.path = core.path.join( file.base, name );
				return core.path.SCRIPTS;
			}

			if ( core.getExtname( file.path ) === '.css' ) {

				file.path = core.path.join( file.base, name );
				return core.path.STYLES;
			}

			file.path = core.path.join( file.base, array.slice( array.indexOf( 'blocks' ) + 2 ).join( core.path.SEP ).replace( core.path.SEP + 'assets', '' ) );
			
			return core.path.STATIC;
	};


	return ( cb ) => {

		if ( ! task.src.length > 0 ) return cb();

		return gulp.src( task.src, {since: gulp.lastRun( task.name )} )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( gulp.dest( task.dest ) );

	}


};
