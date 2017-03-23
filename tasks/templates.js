
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	let globalData = {

		app: core.config.app,
		head: core.config.head,
		isDevelopment: core.isDevelopment,
		cssBundles: core.config.options.cssBundles,
		jsBundles: core.config.options.jsBundles,
		paths: {
			root: './',
			styles: './' + core.config.dist.styles,
			static: './' + core.config.dist.static,
			scripts: './' + core.config.dist.scripts,
			favicons: './' + core.config.dist.favicons
		},
		blocks: core.readBlocks()

	};

	task.src = core.path.pages( '*' + core.config.extnames.templates );
	
	task.dest = core.path.DIST;


	if ( core.config.extnames.templates === '.html' ) {

		task.require = 'gulp-file-include';

		task.data = {
			prefix: '@@',
			basepath: '@file',
			context: {
				global: globalData
			}
		};

	}

	if ( core.config.extnames.templates === '.twig' ) {

		task.require = 'gulp-twig';

		task.data = {
			data: {
				global: globalData
			}
		};

	}

	if ( core.config.extnames.templates === '.pug' ) {

		task.require = 'gulp-pug';

		task.data = {
			doctype: 'html',
			pretty: '\t',
			basedir: core.path.ROOT,
			data: {
				global: globalData
			}
		};

		task.data.data.global.newLine = task.data.pretty ? '\n' : '';

		task.dest = core.prettyFix; // https://github.com/werty1001/bempug/issues/1

	}


	return ( cb ) => {

		if ( ! task.require ) return cb();

		return gulp.src( task.src, {since: gulp.lastRun( task.name )} )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( require( task.require )( task.data ) )
			.pipe( gulp.dest( task.dest ) );

	};


};
