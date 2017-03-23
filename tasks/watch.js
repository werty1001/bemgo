
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	return ( cb ) => {


		if ( ! core.isDevelopment ) return cb();


		core.watch = true;

		gulp.watch(
			core.path.blocks( '*/*/img/symbol/*.svg' ), gulp.series( 'symbol', 'scripts' )
		);

		gulp.watch(
			core.path.temp( '*' + core.config.extnames.scripts ), gulp.series( 'scripts' )
		);

		gulp.watch(
			core.path.temp( '*' + core.config.extnames.styles ), gulp.series( 'styles' )
		);

		gulp.watch(
			core.path.blocks( '**/*' + core.config.extnames.scripts ), gulp.series( 'check_scripts' )
		);

		gulp.watch([

				core.path.blocks( '**/*' + core.config.extnames.styles ),
				core.path.blocks( '**/*.css' )

			], gulp.series( 'check_styles' )
		);

		gulp.watch(

			core.path.blocks( '**/*' + core.config.extnames.templates )
		
		).on( 'change', core.changeTemplate );

		gulp.watch(

			core.path.blocks( '*/*/assets/**/*.*' ), gulp.series( 'assets' )

		).on( 'add', core.editTime );

		gulp.watch(

			core.path.blocks( '*/*/fonts/*.{eot,svg,ttf,woff,woff2}' ), gulp.series( 'fonts' )
		
		).on( 'add', core.editTime );

		gulp.watch([

				core.path.blocks( '*/*/img/*.{png,jpg,jpeg,svg,gif,ico}' ),
				core.path.blocks( '*/*/img/sprite/*.{png,jpg,jpeg,svg,gif,ico}' )
			
			], gulp.series( 'img' )
		
		).on( 'add', core.editTime );

		return gulp.watch(
			core.path.pages( '*' + core.config.extnames.templates ), {delay: 500}, gulp.series( 'templates', 'parser' )
		);

	};


};
