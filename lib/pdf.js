'use strict';

/**
* FUNCTION: getPDF( a, b )
*	Returns a probability density function for a uniform distribution with parameters `a` and `b`.
*
* @private
* @param {Number} a - minimum value
* @param {Number} b - maximum value
* @returns {Function} probability density function (PDF)
*/
function getPDF( a, b ) {
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		return ( a <= x && x <= b ) ? 1 / ( b - a ) :  0;
	};
} // end FUNCTION getPDF()


// EXPORTS //

module.exports = getPDF;
