
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	task.src = core.isDevelopment ? [

		core.path.blocks( '*/*/img/*.{png,jpg,jpeg,svg,gif,ico}' ),
		core.path.blocks( '*/*/img/sprite/*.{png,jpg,jpeg,svg,gif,ico}' )

	] : core.used.imgs;

	task.dest = ( file ) => {

		let array = file.path.split( core.path.SEP ),
			name = array[ array.length - 1 ];

			if ( file.path.indexOf( 'sprite' + core.path.SEP ) !== -1 ) {

				file.path = core.path.join( file.base, 'sprite_' + array[ array.length - 4 ] + '_' + name );
				
			} else {

				file.path = core.path.join( file.base, array[ array.length - 3 ] + '_' + name );

			}

			return core.path.IMG;
	};


	return ( cb ) => {

		if ( ! task.src.length > 0 ) return cb();

		return gulp.src( task.src, {since: gulp.lastRun( task.name )} )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( gulp.dest( task.dest ) );

	}


};
