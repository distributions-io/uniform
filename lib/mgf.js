'use strict';

/**
* FUNCTION: getMGF( a, b )
*	Returns a moment generating function for a uniform distribution with with parameters `a` and `b`.
*
* @private
* @param {Number} a - minimum value
* @param {Number} b - maximum value
* @returns {Function} moment generating function (MGF)
*/
function getMGF( a, b ) {
	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment generating function at input value `t`.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {
 		if ( t !== 0) {
			return Math.exp( t * b ) - Math.exp( t * a ) / ( t * ( b - a ) );
		} else {
			return 1;
		}
	};
} // end FUNCTION getMGF()


// EXPORTS //

module.exports = getMGF;
