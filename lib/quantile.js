'use strict';

/**
* FUNCTION: getQuantileFunction( a, b )
*	Returns a quantile function for a uniform distribution with parameters `a` and `b`.
*
* @private
* @param {Number} a - minimum value
* @param {Number} b - maximum value
* @returns {Function} quantile function
*/
function getQuantileFunction( a, b ) {
	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function at input value `p`.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( p ) {
		return ( 0 <= p && p <= 1 ) ? ( 1 - p ) * a + p * b : NaN;
	};
} // end FUNCTION getQuantileFunction()


// EXPORTS //

module.exports = getQuantileFunction;
