
'use strict'


// Del dist folder

module.exports = {

	build: 0,
	name: 'del',

	run ( done ) {
		return require( 'del' )([
			this.paths._dist,
		])
	},

}

