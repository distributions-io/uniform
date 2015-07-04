'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isNumber = require( 'validate.io-number-primitive' ),
	matrix = require( 'dstructs-matrix' );


// FUNCTIONS //

var getPDF = require( './pdf.js' ),
	getCDF = require( './cdf.js' ),
	getQuantileFunction = require( './quantile.js' ),
	getMGF = require( './mgf.js' );


// DISTRIBUTION //

/**
* FUNCTION: Distribution( a, b )
*	Distribution constructor.
*
* @constructor
* @param {Number} [a] - minimum value
* @param {Number} [b] - maximum value
* @returns {Distribution} Distribution instance
*/
function Distribution( a, b ) {
	if ( a !== undefined && b !== undefined ) {
		if ( !isNumber( a ) ) {
			throw new TypeError( 'constructor()::invalid input argument. The minimum value `a` must be a number primitive. Value: `' + a + '`' );
		}
		if ( !isNumber( b ) ) {
			throw new TypeError( 'constructor()::invalid input argument. The maximum value `b` must be a number primitive. Value: `' + b + '`' );
		}
		if ( b <= a ) {
			throw new TypeError( 'constructor()::invalid input arguments.  `a` must be smaller than `b`.' );
		}
	}

	this._a = a || 0 ; // minimum
	this._b = b || 1; // maximum
	return this;
} // end FUNCTION Distribution()

/**
* METHOD: support()
*	Returns the distribution support.
*
* @returns {Array} distribution support
*/
Distribution.prototype.support = function() {
	return [ this._a, this._b ];
}; // end METHOD support()

/**
* METHOD: a( [value] )
*	`a` setter and getter. If a value is provided, sets the minimum value. If no value is provided, returns it.
*
* @param {Number} [value] - minimum value
* @returns {Distribution|Number} Distribution instance or `a` parameter
*/
Distribution.prototype.a = function( value ) {
	if ( !arguments.length ) {
		return this._a;
	}
	if ( !isNumber ) {
		throw new TypeError( 'a()::invalid input argument. The minimum value `a` must be numeric.' );
	}
	if ( value >= this._b ) {
		throw new TypeError( 'a()::invalid input argument. The minimum value `a` must be smaller than parameter `b`.' );
	}
	this._a = value;
	return this;
}; // end METHOD a()

/**
* METHOD: b( [value] )
*	`b` setter and getter. If a value is provided, sets the maximum value. If no value is provided, returns it.
*
* @param {Number} [value] - maximum value
* @returns {Distribution|Number} Distribution instance or `b` parameter
*/
Distribution.prototype.b = function( value ) {
	if ( !arguments.length ) {
		return this._b;
	}
	if ( !isNumber ) {
		throw new TypeError( 'b()::invalid input argument. The maximum value `b` must be numeric.' );
	}
	if ( value <= this._a ) {
		throw new TypeError( 'a()::invalid input argument. The maximum value `b` must be greater than parameter `a`.' );
	}
	this._b = value;
	return this;
}; // end METHOD b()

/**
* METHOD: mean()
*	Returns the distribution mean.
*
* @returns {Number} mean value
*/
Distribution.prototype.mean = function() {
	return 0.5 * ( this._a + this._b );
}; // end METHOD mean()

/**
* METHOD: variance()
*	Returns the distribution variance.
*
* @returns {Number} variance
*/
Distribution.prototype.variance = function() {
	var a = this._a,
		b = this._b;
	return (1/12) * Math.pow( b - a, 2 );
}; // end METHOD variance()

/**
* METHOD: median()
*	Returns the distribution median.
*
* @returns {Number} median
*/
Distribution.prototype.median = function() {
	return 0.5 * ( this._a + this._b );
}; // end METHOD median()

/**
* METHOD: skewness()
*	Returns the distribution skewness.
*
* @returns {Number} skewness
*/
Distribution.prototype.skewness = function() {
	return 0;
}; // end METHOD skewness()

/**
* METHOD: ekurtosis()
*	Returns the distribution excess kurtosis.
*
* @returns {Number} excess kurtosis
*/
Distribution.prototype.ekurtosis = function() {
	return -6/5;
}; // end METHOD ekurtosis()

/**
* METHOD: entropy()
*	Returns the entropy.
*
* @returns {Number} entropy
*/
Distribution.prototype.entropy = function() {
	return Math.log( this._b - this._a );
}; // end METHOD entropy()

/**
* METHOD: pdf( [x] )
*	If provided an input `x`, evaluates the distribution PDF for each element. If no input argument is provided, returns the PDF.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [x] - input values
* @returns {Function|Array|Matrix|Number} distribution PDF or evaluated PDF
*/
Distribution.prototype.pdf = function( x ) {
	var pdf, len, out, val, i;

	pdf = getPDF( this._a, this._b );

	if ( !arguments.length ) {
		return pdf;
	}
	if ( isNumber( x ) ) {
		return pdf ( x );
	}
	if ( isMatrixLike( x ) ) {
		len = x.length;
		// Create an output matrix:
		out = matrix( new Float64Array( len ), x.shape );
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = pdf( x.data[ i ] );
		}
		return out;
	}
	if ( isArrayLike( x ) ) {
		len = x.length;
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			val = x[ i ];
			if ( !isNumber( val ) ) {
				return NaN;
			} else {
				out[ i ] = pdf( val );
			}
		}
		return out;
	}
	return NaN;
}; // end METHOD pdf()

/**
* METHOD: cdf( [x] )
*	If provided an input `x`, evaluates the distribution CDF for each element. If no input argument is provided, returns the CDF.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [x] - input values
* @returns {Function|Array|Matrix|Number} distribution CDF or evaluated CDF
*/
Distribution.prototype.cdf = function( x ) {
	var cdf, len, out, val, i;

	cdf = getCDF( this._a, this._b );

	if ( !arguments.length ) {
		return cdf;
	}
	if ( isNumber( x ) ) {
		return cdf( x );
	}
	if ( isMatrixLike( x ) ) {
		len = x.length;
		// Create an output matrix:
		out = matrix( new Float64Array( len ), x.shape );
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = cdf( x.data[ i ] );
		}
		return out;
	}
	if ( isArrayLike( x ) ) {
		len = x.length;
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			val = x[ i ];
			if ( !isNumber( val ) ) {
				return NaN;
			} else {
				out[ i ] = cdf( val );
			}
		}
		return out;
	}
	return NaN;
}; // end METHOD cdf()

/**
* METHOD: quantile( [p] )
*	If provided an input `p`, evaluates the distribution quantile function for each element. If no input argument is provided, returns the quantile function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [p] - input values
* @returns {Function|Array|Matrix|Number} distribution quantile function or evaluated quantile function
*/
Distribution.prototype.quantile = function( p ) {
	var q, len, out, val, i;

	q = getQuantileFunction( this._a, this._b );

	if ( !arguments.length ) {
		return q;
	}
	if ( isNumber( p ) ) {
		return q( p );
	}
	if ( isMatrixLike( p ) ) {
		len = p.length;
		// Create an output matrix:
		out = matrix( new Float64Array( len ), p.shape );
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = q( p.data[ i ] );
		}
		return out;
	}
	if ( isArrayLike( p ) ) {
		len = p.length;
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			val = p[ i ];
			if ( !isNumber( val ) ) {
				return NaN;
			} else {
				out[ i ] = q( val );
			}
		}
		return out;
	}
	return NaN;
}; // end METHOD quantile()

/**
* METHOD: mgf( [t] )
*	If provided an input `t`, evaluates the moment generating function for each element. If no input argument is provided, returns the moment generating function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} [t] - input values
* @returns {Function|Array|Matrix|Number} moment generating function or evaluated moment generating function
*/
Distribution.prototype.mgf = function( t ) {
	var m, len, out, val, i;

	m = getMGF( this._a, this._b );

	if ( !arguments.length ) {
		return m;
	}
	if ( isNumber( t ) ) {
		return m( t );
	}
	if ( isMatrixLike( t ) ) {
		len = t.length;
		// Create an output matrix:
		out = matrix( new Float64Array( len ), t.shape );
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = m( t.data[ i ] );
		}
		return out;
	}
	if ( isArrayLike( t ) ) {
		len = t.length;
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			val = t[ i ];
			if ( !isNumber( val ) ) {
				return NaN;
			} else {
				out[ i ] = m( val );
			}
		}
		return out;
	}
	return NaN;
}; // end METHOD mgf()


// EXPORTS //

module.exports = function createDistribution( a, b ) {
	return new Distribution( a, b );
};
