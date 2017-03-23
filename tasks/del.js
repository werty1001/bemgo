
'use strict';


// Export

module.exports = ( task, core ) => {


	task.src = [
		core.path.DIST,
		core.path.temp( '*.*' )
	];


	return ( cb ) => require( 'del' )( task.src );


};
