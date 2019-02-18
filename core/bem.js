
'use strict'


/**
 * Check class on BEM notation.
 *
 * @param {String} cls
 *
 * @return {Boolean} or {String}
 */

module.exports = {

	isBlock ( cls ) {
		return ( !this.isElement( cls ) && !this.isModifier( cls ) ) // {Boolean}
	},

	isElement ( cls ) {
		return ( /([a-z\d])__([a-z\d])/i.test( cls ) && !this.isModifier( cls ) ) // {Boolean}
	},

	isModifier ( cls ) {
		return /([a-z\d])(_|--)([a-z\d])/i.test( cls ) // {Boolean}
	},

	getBlock ( cls ) {
		if ( typeof cls !== 'string' ) return ''
		return this.delModifier( cls ).split( '__' )[0] // {String}
	},

	delModifier ( cls ) {
		return cls.replace( /([a-z\d-]+|[a-z\d-]+__[a-z\d-]+)(_|--)([a-z\d](.)+)/i, '$1' ) // {String}
	},

}

