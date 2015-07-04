uniform
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Continuous uniform distribution.


## Installation

``` bash
$ npm install distributions-exponential
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var createDist = require( 'distributions-uniform' );
```

To create a uniform distribution,

``` javascript
var dist = createDist();
```

The constructor function takes two input arguments, `a` and `b`, the lower and upper endpoints of the distribution. By default, a standard uniform distribution over the interval `[0,1]` is created.

The distribution is configurable and has the following methods...


#### dist.support()

Returns the distribution support, which is all numbers in the interval `[a,b]`.

``` javascript
var support = dist.support();
// returns [ a, b ]
```


#### dist.a( [value] )

This method is a setter/getter. If no `value` is provided, returns the `minimum value`. To set `a`,

``` javascript
dist.a( 10 );
```

The default minimum value is 1.

#### dist.b( [value] )

This method is a setter/getter. If no `value` is provided, returns the `maximum value`. To set `b`,

``` javascript
dist.b( 100 );
```

The default maximum value is 1.

#### dist.mean()

Returns the distribution `mean`.

``` javascript
var mean = dist.mean();
// returns 0.5 * ( a + b )
```


#### dist.variance()

Returns the distribution `variance`.

``` javascript
var variance = dist.variance();
// returns (1/12) * (b - a)^2
```


#### dist.median()

Returns the distribution `median`.

``` javascript
var median = dist.median();
// returns 0.5 * ( a + b )
```

#### dist.skewness()

Returns the distribution `skewness`.

``` javascript
var skewness = dist.skewness();
// returns 0
```

#### dist.ekurtosis()

Returns the distribution `excess kurtosis`.

``` javascript
var excess = dist.ekurtosis();
// returns -6/5
```

#### dist.entropy()

Returns the distribution's [differential entropy](http://en.wikipedia.org/wiki/Differential_entropy).

``` javascript
var entropy = dist.entropy();
// returns ln( b - a )
```

#### dist.pdf( [x] )

If no argument is provided, returns the probability density function (PDF). If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) is provided, evaluates the PDF for each element.

``` javascript
var data = [ 0, 0.2, 0.5, 0.8 ];

var pdf = dist.pdf( data );
// returns [...]
```

#### dist.cdf( [x] )

If no argument is provided, returns the cumulative distribution function (CDF). If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) is provided, evaluates the CDF for each element.


``` javascript
var data = [ 0, 0.2, 0.5, 0.8 ];

var cdf = dist.cdf( data );
// returns [...]
```


#### dist.quantile( [p] )

If no argument is provided, returns the inverse cumulative distribution (quantile) function. If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) of probabilities is provided, evaluates the quantile function for each element.

``` javascript
var probs = [ 0.025, 0.5, 0.975 ];

var quantiles = dist.quantile( probs );
// returns [...]
```

Note: all values must exist on the interval `[0, 1]`, otherwise the function returns `NaN`.

#### dist.mgf( [t] )

If no argument is provided, returns the moment generating function (MGF) of the distribution. If a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix) is provided, evaluates the MGF for each input element.


## Examples

``` javascript
'use strict';

var createDist = require( 'distributions-uniform' );

// Define the distribution parameters...
var a = 10,
	b = 20;

// Create a vector...
var vec = new Array( 1000 ),
	len = vec.length;

for ( var i = 0; i < len; i++ ) {
	vec[ i ] = a + ( b - a ) * Math.random();
}

// Create a uniform distribution and configure...
var dist = createDist( a, b );

// Evaluate the probability density function over the vector...
var pdf = dist.pdf( vec );

var arr = new Array( 100 );
for ( var j = 0; j < arr.length; j++ ) {
	arr[ j ] = [ vec[j], pdf[j] ];
}
console.log( arr );

// Evaluate the quantile function for canonical cumulative probability values...
var quantiles = dist.inv( [ 0.025, 0.5, 0.975 ] );

console.log( quantiles );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Distributions.io](https://github.com/distributions-io) Authors.

[npm-image]: http://img.shields.io/npm/v/distributions-exponential.svg
[npm-url]: https://npmjs.org/package/distributions-exponential

[travis-image]: http://img.shields.io/travis/distributions-io/exponential/master.svg
[travis-url]: https://travis-ci.org/distributions-io/exponential

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/exponential/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/exponential?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/exponential.svg
[dependencies-url]: https://david-dm.org/distributions-io/exponential

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/exponential.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/exponential

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/exponential.svg
[github-issues-url]: https://github.com/distributions-io/exponential/issues
