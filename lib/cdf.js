'use strict';

/**
* FUNCTION: getCDF( a, b )
*	Returns a cumulative density function for a uniform distribution with with parameters `a` and `b`.
*
* @private
* @param {Number} a - minimum value
* @param {Number} b - maximum value
* @returns {Function} cumulative density function (CDF)
*/
function getCDF( a, b ) {
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {
        if ( x < a) {
            return 0;
        } else if ( x >= b ) {
            return 1;
        } else {
            return ( x - a ) / ( b - a );
        }
	};
} // end FUNCTION getCDF()


// EXPORTS //

module.exports = getCDF;
