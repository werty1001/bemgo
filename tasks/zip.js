
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	task.src = core.zipDev ? [

		core.path.root( '.!(DS_Store)' ),
		core.path.root( '*.!(log|db|ini|zip)' ),
		core.path.root( '!(node_modules|bower_components|dist)/**/*.*' ),
		'!' + core.path.temp( '*.*' )
	
	] : core.path.dist( '**/*.*' );

	task.data = `${core.zipDev ? 'dev_' : ''}${core.config.app.name}[${core.getDate()}].zip`;

	task.dest = core.path.ROOT;


	return ( cb ) => {

		return gulp.src( task.src )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( require( 'gulp-zip' )( task.data ) )
			.pipe( gulp.dest( task.dest ) );

	} 


};
