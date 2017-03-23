
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	if ( core.isDevelopment ) return ( cb ) => cb();


	task.src = core.path.app( 'icon.png' );

	task.data = core.config.manifest;

	task.data.path = core.config.dist.favicons;

	task.data.icons = {
		favicons: core.config.head.favicons,
		windows: core.config.head.msapplication,
		android: core.config.head.androidIcons,
		appleIcon: core.config.head.appleTouchIcons,
		appleStartup: false,
		firefox: false,
		yandex: false,
		coast: false
	};

	task.dest = ( file ) => {

		if ( file.path === 'browserconfig.xml' || ( ! core.config.head.manifest && file.path === 'manifest.json' ) )
			return core.path.TEMP;

		return core.path.FAVICONS;
	};

	if ( ! core.checkFile( task.src ) ) task.src = core.path.core( 'icon.png' );


	return ( cb ) => {

		return gulp.src( task.src )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( require( 'gulp-favicons' )( task.data ) )
			.pipe( gulp.dest( task.dest ) );

	};


};
