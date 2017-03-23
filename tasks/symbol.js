
'use strict';


// Require

const gulp = require( 'gulp' );


// Export

module.exports = ( task, core ) => {


	core.symbol = false;

	task.src = core.isDevelopment ? [ core.path.blocks( '*/*/img/symbol/*.svg' ) ] : core.used.symbol;

	task.data = {

		shape: {
			id: {
				generator: ( name, file ) => {

					let array = name.split( core.path.SEP );
						return array[ array.length - 4 ] + '__' + core.getBasename( name );							
				}
			}
		},

		mode: {
			symbol: {
				dest: core.path.IMG,
				sprite: 'symbol.svg',
				render: false,
				svg: {
					xmlDeclaration: false,
					doctypeDeclaration: false,
					rootAttributes: {
						style: 'display:none;',
						'aria-hidden': 'true'
					}
				}
			}
		}

	};

	task.dest = ( file ) => {

		core.symbol = `./${core.path.join( core.config.dist.img, task.data.mode.symbol.sprite )}?ver=${new Date().getTime()}`;

		return core.path.ROOT;
	}; 


	return ( cb ) => {

		if ( ! task.src.length > 0 ) return cb();

		return gulp.src( task.src )
			.pipe( require( 'gulp-plumber' )( core.errorHandler ) )
			.pipe( require( 'gulp-svg-sprite' )( task.data ) )
			.pipe( gulp.dest( task.dest ) );

	};


};
