
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	task.src = core.path.dist( '**/*.*' );
	task.err = false;

	if ( ! core.config.ftp.host ) task.err = '\n\n !!! Error \n\n ### FTP host is not specified! ### \n\n';
	if ( ! core.config.ftp.dest ) task.err = '\n\n !!! Error \n\n ### FTP dest is not specified! ### \n\n';
	if ( ! core.config.ftp.user ) task.err = '\n\n !!! Error \n\n ### FTP user is not specified! ### \n\n';
	if ( ! core.config.ftp.pass ) task.err = '\n\n !!! Error \n\n ### FTP password is not specified! ### \n\n';


	return ( cb ) => {

		if ( task.err ) {

			console.log( task.err );
			return cb();			
		}

		let connect = require( 'vinyl-ftp' ).create( core.config.ftp );

		return gulp.src( task.src, { buffer: false } )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( connect.dest( core.config.ftp.dest ) )
			.on( 'end', () => console.log( 'Files successfully uploaded!' ) );

	};


};
