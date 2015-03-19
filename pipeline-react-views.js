(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["pipelineReactViews"] = factory();
	else
		root["pipelineReactViews"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var creator = __webpack_require__(1);

	module.exports = function(React){
	  return {
	    name: 'pipeline-react-views',
	    factories: {
	      view: creator(React)
	    }
	  };
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _, cb_internal_name, humanize;

	_ = __webpack_require__(2);

	cb_internal_name = function(store_name) {
	  return "_pipeline_get_" + store_name + "_state_function";
	};

	humanize = function(string) {
	  if (!_.isString(string)) {
	    string = '';
	  }
	  return string.charAt(0).toUpperCase() + string.replace(/([A-Z])/g, " $1").slice(1);
	};

	module.exports = function(React) {
	  var make_create_view;
	  return make_create_view = function(_app) {
	    var create_view, mixin, ref;
	    if (!((_app != null ? (ref = _app.dispatcher) != null ? ref.registerStoreCallback : void 0 : void 0) != null)) {
	      throw new Error("Couldn't add 'create.view' to _app because _app was buggered.");
	    }
	    mixin = function(store_names, view_name) {
	      return {
	        componentWillMount: function() {
	          console.log("component '" + view_name + "' is mounting and registering with stores: [" + store_names + "]");
	          _.each(store_names, (function(_this) {
	            return function(store_name) {
	              if (!_app.stores[store_name]) {
	                throw new Error(view_name + " attempted to subscribe to " + store_name + " but that store didn't exist.");
	              }
	              _this.stores[store_name] = _app.stores[store_name];
	              return _app.dispatcher.registerStoreCallback(store_name, _this[cb_internal_name(store_name)], view_name);
	            };
	          })(this));
	          return _.each(store_names, (function(_this) {
	            return function(store_name) {
	              return _this[cb_internal_name(store_name)]();
	            };
	          })(this));
	        },
	        componentWillUnmount: function() {
	          return _.each(store_names, (function(_this) {
	            return function(store_name) {
	              return _app.dispatcher.unregisterStoreCallback(store_name, _this[cb_internal_name(store_name)], view_name);
	            };
	          })(this));
	        }
	      };
	    };
	    create_view = function(view_name, options) {
	      var actions, store_names, view;
	      if (_app.hasStarted) {
	        throw new Error("Cannot createa new view " + view_name + ".  App has alreay started.");
	      }
	      if (_.isArray(options.stores)) {
	        throw new Ereror("Stores as array of keys hasn't been implemnted yet");
	      }
	      store_names = _.keys(options.stores);
	      _.each(options.stores, function(cb, store_name) {
	        return options[cb_internal_name(store_name)] = function() {
	          var state;
	          state = cb.call(this);
	          if (_.isObject(state)) {
	            return this.setState(state);
	          } else {
	            return console.log('DID NOT RETURN OBJECT FROM STORE CHANGE FUNCTION');
	          }
	        };
	      });
	      if (!_.isEmpty(store_names)) {
	        options.mixins = options.mixins || [];
	        options.mixins.push(mixin(store_names, view_name));
	      }
	      options.stores = {};
	      _.extend(options, {
	        displayName: humanize(view_name)
	      }, actions = _app.actions);
	      options.views = _app.views;
	      view = React.createFactory(React.createClass(options));
	      if (!_.isObject(_app.views)) {
	        _app.views = {};
	      }
	      _app.views[view_name] = view;
	      return view;
	    };
	    return create_view;
	  };
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 3.5.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash include="isString,each,isArray,keys,isObject,isEmpty,extend" minus="chain" exports="node" --output libs/lodash.js -d`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '3.5.0';

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      stringTag = '[object String]';

	  /** Used to detect host constructors (Safari > 5). */
	  var reHostCtor = /^\[object .+?Constructor\]$/;

	  /**
	   * Used to match `RegExp` special characters.
	   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	   * for more details.
	   */
	  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);

	  /** Used to detect functions containing a `this` reference. */
	  var reThis = /\bthis\b/;

	  /** Used to fix the JScript `[[DontEnum]]` bug. */
	  var shadowProps = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

	  /** Detect free variable `window`. */
	  var freeWindow = objectTypes[typeof window] && window;

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it is the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || this;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The base implementation of `_.isFunction` without support for environments
	   * with incorrect `typeof` results.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   */
	  function baseIsFunction(value) {
	    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
	    return typeof value == 'function' || false;
	  }

	  /**
	   * Converts `value` to a string if it is not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */
	  function baseToString(value) {
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }

	  /**
	   * Checks if `value` is a host object in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	   */
	  var isHostObject = (function() {
	    try {
	      Object({ 'toString': 0 } + '');
	    } catch(e) {
	      return function() { return false; };
	    }
	    return function(value) {
	      // IE < 9 presents many host objects as `Object` objects that can coerce
	      // to strings despite having improperly defined `toString` methods.
	      return typeof value.toString != 'function' && typeof (value + '') == 'string';
	    };
	  }());

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return (value && typeof value == 'object') || false;
	  }

	  /*--------------------------------------------------------------------------*/

	  /** Used for native method references. */
	  var arrayProto = Array.prototype,
	      errorProto = Error.prototype,
	      objectProto = Object.prototype,
	      stringProto = String.prototype;

	  /** Used to resolve the decompiled source of functions. */
	  var fnToString = Function.prototype.toString;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /** Used to detect if a method is native. */
	  var reNative = RegExp('^' +
	    escapeRegExp(objToString)
	    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	  );

	  /** Native method references. */
	  var propertyIsEnumerable = objectProto.propertyIsEnumerable,
	      splice = arrayProto.splice,
	      Uint8Array = isNative(Uint8Array = root.Uint8Array) && Uint8Array;

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
	      nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /** Used to avoid iterating over non-enumerable properties in IE < 9. */
	  var nonEnumProps = {};
	  nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	  nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
	  nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
	  nonEnumProps[objectTag] = { 'constructor': true };

	  arrayEach(shadowProps, function(key) {
	    for (var tag in nonEnumProps) {
	      if (hasOwnProperty.call(nonEnumProps, tag)) {
	        var props = nonEnumProps[tag];
	        props[key] = hasOwnProperty.call(props, key);
	      }
	    }
	  });

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	   * Methods that operate on and return arrays, collections, and functions can
	   * be chained together. Methods that return a boolean or single value will
	   * automatically end the chain returning the unwrapped value. Explicit chaining
	   * may be enabled using `_.chain`. The execution of chained methods is lazy,
	   * that is, execution is deferred until `_#value` is implicitly or explicitly
	   * called.
	   *
	   * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	   * fusion is an optimization that merges iteratees to avoid creating intermediate
	   * arrays and reduce the number of iteratee executions.
	   *
	   * Chaining is supported in custom builds as long as the `_#value` method is
	   * directly or indirectly included in the build.
	   *
	   * In addition to lodash methods, wrappers have `Array` and `String` methods.
	   *
	   * The wrapper `Array` methods are:
	   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	   * `splice`, and `unshift`
	   *
	   * The wrapper `String` methods are:
	   * `replace` and `split`
	   *
	   * The wrapper methods that support shortcut fusion are:
	   * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	   * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	   * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	   * and `where`
	   *
	   * The chainable wrapper methods are:
	   * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	   * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	   * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
	   * `difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
	   * `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
	   * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
	   * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
	   * `keysIn`, `map`, `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`,
	   * `mixin`, `negate`, `noop`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	   * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	   * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `reverse`,
	   * `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`, `sortByOrder`, `splice`,
	   * `spread`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`,
	   * `throttle`, `thru`, `times`, `toArray`, `toPlainObject`, `transform`,
	   * `union`, `uniq`, `unshift`, `unzip`, `values`, `valuesIn`, `where`,
	   * `without`, `wrap`, `xor`, `zip`, and `zipObject`
	   *
	   * The wrapper methods that are **not** chainable by default are:
	   * `add`, `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
	   * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
	   * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
	   * `identity`, `includes`, `indexOf`, `inRange`, `isArguments`, `isArray`,
	   * `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`,
	   * `isFinite`,`isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
	   * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
	   * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `max`, `min`,
	   * `noConflict`, `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`,
	   * `random`, `reduce`, `reduceRight`, `repeat`, `result`, `runInContext`,
	   * `shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`,
	   * `startCase`, `startsWith`, `sum`, `template`, `trim`, `trimLeft`,
	   * `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
	   *
	   * The wrapper method `sample` will return a wrapped value when `n` is provided,
	   * otherwise an unwrapped value is returned.
	   *
	   * @name _
	   * @constructor
	   * @category Chain
	   * @param {*} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var wrapped = _([1, 2, 3]);
	   *
	   * // returns an unwrapped value
	   * wrapped.reduce(function(sum, n) {
	   *   return sum + n;
	   * });
	   * // => 6
	   *
	   * // returns a wrapped value
	   * var squares = wrapped.map(function(n) {
	   *   return n * n;
	   * });
	   *
	   * _.isArray(squares);
	   * // => false
	   *
	   * _.isArray(squares.value());
	   * // => true
	   */
	  function lodash() {
	    // No operation performed.
	  }

	  /**
	   * An object environment feature flags.
	   *
	   * @static
	   * @memberOf _
	   * @type Object
	   */
	  var support = lodash.support = {};

	  (function(x) {
	    var Ctor = function() { this.x = 1; },
	        object = { '0': 1, 'length': 1 },
	        props = [];

	    Ctor.prototype = { 'valueOf': 1, 'y': 1 };
	    for (var key in new Ctor) { props.push(key); }

	    /**
	     * Detect if the `toStringTag` of `arguments` objects is resolvable
	     * (all but Firefox < 4, IE < 9).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.argsTag = objToString.call(arguments) == argsTag;

	    /**
	     * Detect if `name` or `message` properties of `Error.prototype` are
	     * enumerable by default (IE < 9, Safari < 5.1).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') ||
	      propertyIsEnumerable.call(errorProto, 'name');

	    /**
	     * Detect if `prototype` properties are enumerable by default.
	     *
	     * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	     * (if the prototype or a property on the prototype has been set)
	     * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
	     * property to `true`.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

	    /**
	     * Detect if functions can be decompiled by `Function#toString`
	     * (all but Firefox OS certified apps, older Opera mobile browsers, and
	     * the PlayStation 3; forced `false` for Windows 8 apps).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

	    /**
	     * Detect if `Function#name` is supported (all but IE).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcNames = typeof Function.name == 'string';

	    /**
	     * Detect if string indexes are non-enumerable
	     * (IE < 9, RingoJS, Rhino, Narwhal).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.nonEnumStrings = !propertyIsEnumerable.call('x', 0);

	    /**
	     * Detect if properties shadowing those on `Object.prototype` are
	     * non-enumerable.
	     *
	     * In IE < 9 an object's own properties, shadowing non-enumerable ones,
	     * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.nonEnumShadows = !/valueOf/.test(props);

	    /**
	     * Detect if `Array#shift` and `Array#splice` augment array-like objects
	     * correctly.
	     *
	     * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array `shift()`
	     * and `splice()` functions that fail to remove the last element, `value[0]`,
	     * of array-like objects even though the `length` property is set to `0`.
	     * The `shift()` method is buggy in compatibility modes of IE 8, while `splice()`
	     * is buggy regardless of mode in IE < 9.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

	    /**
	     * Detect lack of support for accessing string characters by index.
	     *
	     * IE < 8 can't access characters by index. IE 8 can only access characters
	     * by index on string literals, not string objects.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

	    /**
	     * Detect if `arguments` object indexes are non-enumerable.
	     *
	     * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	     * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	     * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	     * checks for indexes that exceed their function's formal parameters with
	     * associated values of `0`.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	    } catch(e) {
	      support.nonEnumArgs = true;
	    }
	  }(0, 0));

	  /*------------------------------------------------------------------------*/

	  /**
	   * A specialized version of `_.forEach` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  /**
	   * The base implementation of `_.assign` without support for argument juggling,
	   * multiple sources, and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {Function} [customizer] The function to customize assigning values.
	   * @returns {Object} Returns the destination object.
	   */
	  function baseAssign(object, source, customizer) {
	    var props = keys(source);
	    if (!customizer) {
	      return baseCopy(source, object, props);
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index],
	          value = object[key],
	          result = customizer(value, source[key], key, object, source);

	      if ((result === result ? (result !== value) : (value === value)) ||
	          (typeof value == 'undefined' && !(key in object))) {
	        object[key] = result;
	      }
	    }
	    return object;
	  }

	  /**
	   * Copies the properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Array} props The property names to copy.
	   * @returns {Object} Returns `object`.
	   */
	  function baseCopy(source, object, props) {
	    if (!props) {
	      props = object;
	      object = {};
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      object[key] = source[key];
	    }
	    return object;
	  }

	  /**
	   * The base implementation of `_.forEach` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array|Object|string} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array|Object|string} Returns `collection`.
	   */
	  function baseEach(collection, iteratee) {
	    var length = collection ? collection.length : 0;
	    if (!isLength(length)) {
	      return baseForOwn(collection, iteratee);
	    }
	    var index = -1,
	        iterable = toObject(collection);

	    while (++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  }

	  /**
	   * The base implementation of `baseForIn` and `baseForOwn` which iterates
	   * over `object` properties returned by `keysFunc` invoking `iteratee` for
	   * each property. Iterator functions may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  function baseFor(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  }

	  /**
	   * The base implementation of `_.forOwn` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return baseFor(object, iteratee, keys);
	  }

	  /**
	   * A specialized version of `baseCallback` which only supports `this` binding
	   * and specifying the number of arguments to provide to `func`.
	   *
	   * @private
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {number} [argCount] The number of arguments to provide to `func`.
	   * @returns {Function} Returns the callback.
	   */
	  function bindCallback(func, thisArg, argCount) {
	    if (typeof func != 'function') {
	      return identity;
	    }
	    if (typeof thisArg == 'undefined') {
	      return func;
	    }
	    switch (argCount) {
	      case 1: return function(value) {
	        return func.call(thisArg, value);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	      case 5: return function(value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	    }
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  }

	  /**
	   * Creates a function that assigns properties of source object(s) to a given
	   * destination object.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return function() {
	      var args = arguments,
	          length = args.length,
	          object = args[0];

	      if (length < 2 || object == null) {
	        return object;
	      }
	      var customizer = args[length - 2],
	          thisArg = args[length - 1],
	          guard = args[3];

	      if (length > 3 && typeof customizer == 'function') {
	        customizer = bindCallback(customizer, thisArg, 5);
	        length -= 2;
	      } else {
	        customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
	        length -= (customizer ? 1 : 0);
	      }
	      if (guard && isIterateeCall(args[1], args[2], guard)) {
	        customizer = length == 3 ? null : customizer;
	        length = 2;
	      }
	      var index = 0;
	      while (++index < length) {
	        var source = args[index];
	        if (source) {
	          assigner(object, source, customizer);
	        }
	      }
	      return object;
	    };
	  }

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = +value;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }

	  /**
	   * Checks if the provided arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index;
	    if (type == 'number') {
	      var length = object.length,
	          prereq = isLength(length) && isIndex(index, length);
	    } else {
	      prereq = type == 'string' && index in object;
	    }
	    if (prereq) {
	      var other = object[index];
	      return value === value ? (value === other) : (other !== other);
	    }
	    return false;
	  }

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is based on ES `ToLength`. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   */
	  function isLength(value) {
	    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  /**
	   * A fallback implementation of `Object.keys` which creates an array of the
	   * own enumerable property names of `object`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   */
	  function shimKeys(object) {
	    var props = keysIn(object),
	        propsLength = props.length,
	        length = propsLength && object.length,
	        support = lodash.support;

	    var allowIndexes = length && isLength(length) &&
	      (isArray(object) || (support.nonEnumStrings && isString(object)) ||
	        (support.nonEnumArgs && isArguments(object)));

	    var index = -1,
	        result = [];

	    while (++index < propsLength) {
	      var key = props[index];
	      if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  /**
	   * Converts `value` to an object if it is not one.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {Object} Returns the object.
	   */
	  function toObject(value) {
	    if (lodash.support.unindexedChars && isString(value)) {
	      var index = -1,
	          length = value.length,
	          result = Object(value);

	      while (++index < length) {
	        result[index] = value.charAt(index);
	      }
	      return result;
	    }
	    return isObject(value) ? value : Object(value);
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Iterates over elements of `collection` invoking `iteratee` for each element.
	   * The `iteratee` is bound to `thisArg` and invoked with three arguments;
	   * (value, index|key, collection). Iterator functions may exit iteration early
	   * by explicitly returning `false`.
	   *
	   * **Note:** As with other "Collections" methods, objects with a `length` property
	   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	   * may be used for object iteration.
	   *
	   * @static
	   * @memberOf _
	   * @alias each
	   * @category Collection
	   * @param {Array|Object|string} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @param {*} [thisArg] The `this` binding of `iteratee`.
	   * @returns {Array|Object|string} Returns `collection`.
	   * @example
	   *
	   * _([1, 2]).forEach(function(n) {
	   *   console.log(n);
	   * }).value();
	   * // => logs each value from left to right and returns the array
	   *
	   * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	   *   console.log(n, key);
	   * });
	   * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	   */
	  function forEach(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
	      ? arrayEach(collection, iteratee)
	      : baseEach(collection, bindCallback(iteratee, thisArg, 3));
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Checks if `value` is classified as an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    var length = isObjectLike(value) ? value.length : undefined;
	    return (isLength(length) && objToString.call(value) == argsTag) || false;
	  }
	  // Fallback for environments without a `toStringTag` for `arguments` objects.
	  if (!support.argsTag) {
	    isArguments = function(value) {
	      var length = isObjectLike(value) ? value.length : undefined;
	      return (isLength(length) && hasOwnProperty.call(value, 'callee') &&
	        !propertyIsEnumerable.call(value, 'callee')) || false;
	    };
	  }

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(function() { return arguments; }());
	   * // => false
	   */
	  var isArray = nativeIsArray || function(value) {
	    return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
	  };

	  /**
	   * Checks if `value` is empty. A value is considered empty unless it is an
	   * `arguments` object, array, string, or jQuery-like collection with a length
	   * greater than `0` or an object with own enumerable properties.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {Array|Object|string} value The value to inspect.
	   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	   * @example
	   *
	   * _.isEmpty(null);
	   * // => true
	   *
	   * _.isEmpty(true);
	   * // => true
	   *
	   * _.isEmpty(1);
	   * // => true
	   *
	   * _.isEmpty([1, 2, 3]);
	   * // => false
	   *
	   * _.isEmpty({ 'a': 1 });
	   * // => false
	   */
	  function isEmpty(value) {
	    if (value == null) {
	      return true;
	    }
	    var length = value.length;
	    if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
	        (isObjectLike(value) && isFunction(value.splice)))) {
	      return !length;
	    }
	    return !keys(value).length;
	  }

	  /**
	   * Checks if `value` is classified as a `Function` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   *
	   * _.isFunction(/abc/);
	   * // => false
	   */
	  var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in older versions of Chrome and Safari which return 'function' for regexes
	    // and Safari 8 equivalents which return 'object' for typed array constructors.
	    return objToString.call(value) == funcTag;
	  };

	  /**
	   * Checks if `value` is the language type of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // Avoid a V8 JIT bug in Chrome 19-20.
	    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	    var type = typeof value;
	    return type == 'function' || (value && type == 'object') || false;
	  }

	  /**
	   * Checks if `value` is a native function.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	   * @example
	   *
	   * _.isNative(Array.prototype.push);
	   * // => true
	   *
	   * _.isNative(_);
	   * // => false
	   */
	  function isNative(value) {
	    if (value == null) {
	      return false;
	    }
	    if (objToString.call(value) == funcTag) {
	      return reNative.test(fnToString.call(value));
	    }
	    return (isObjectLike(value) &&
	      (isHostObject(value) ? reNative : reHostCtor).test(value)) || false;
	  }

	  /**
	   * Checks if `value` is classified as a `String` primitive or object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isString('abc');
	   * // => true
	   *
	   * _.isString(1);
	   * // => false
	   */
	  function isString(value) {
	    return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources overwrite property assignments of previous sources.
	   * If `customizer` is provided it is invoked to produce the assigned values.
	   * The `customizer` is bound to `thisArg` and invoked with five arguments;
	   * (objectValue, sourceValue, key, object, source).
	   *
	   * @static
	   * @memberOf _
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @param {Function} [customizer] The function to customize assigning values.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	   * // => { 'user': 'fred', 'age': 40 }
	   *
	   * // using a customizer callback
	   * var defaults = _.partialRight(_.assign, function(value, other) {
	   *   return typeof value == 'undefined' ? other : value;
	   * });
	   *
	   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  var assign = createAssigner(baseAssign);

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    if (object) {
	      var Ctor = object.constructor,
	          length = object.length;
	    }
	    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	        (typeof object == 'function' ? lodash.support.enumPrototypes : (length && isLength(length)))) {
	      return shimKeys(object);
	    }
	    return isObject(object) ? nativeKeys(object) : [];
	  };

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    if (object == null) {
	      return [];
	    }
	    if (!isObject(object)) {
	      object = Object(object);
	    }
	    var length = object.length,
	        support = lodash.support;

	    length = (length && isLength(length) &&
	      (isArray(object) || (support.nonEnumStrings && isString(object)) ||
	        (support.nonEnumArgs && isArguments(object))) && length) || 0;

	    var Ctor = object.constructor,
	        index = -1,
	        proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
	        isProto = proto === object,
	        result = Array(length),
	        skipIndexes = length > 0,
	        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
	        skipProto = support.enumPrototypes && isFunction(object);

	    while (++index < length) {
	      result[index] = (index + '');
	    }
	    // lodash skips the `constructor` property when it infers it is iterating
	    // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
	    // attribute of an existing property and the `constructor` property of a
	    // prototype defaults to non-enumerable.
	    for (var key in object) {
	      if (!(skipProto && key == 'prototype') &&
	          !(skipErrorProps && (key == 'message' || key == 'name')) &&
	          !(skipIndexes && isIndex(key, length)) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    if (support.nonEnumShadows && object !== objectProto) {
	      var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
	          nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

	      if (tag == objectTag) {
	        proto = objectProto;
	      }
	      length = shadowProps.length;
	      while (length--) {
	        key = shadowProps[length];
	        var nonEnum = nonEnums[key];
	        if (!(isProto && nonEnum) &&
	            (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
	          result.push(key);
	        }
	      }
	    }
	    return result;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	   * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escapeRegExp('[lodash](https://lodash.com/)');
	   * // => '\[lodash\]\(https://lodash\.com/\)'
	   */
	  function escapeRegExp(string) {
	    string = baseToString(string);
	    return (string && reHasRegExpChars.test(string))
	      ? string.replace(reRegExpChars, '\\$&')
	      : string;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * This method returns the first argument provided to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  /*------------------------------------------------------------------------*/

	  // Add functions that return wrapped values when chaining.
	  lodash.assign = assign;
	  lodash.forEach = forEach;
	  lodash.keys = keys;
	  lodash.keysIn = keysIn;

	  // Add aliases.
	  lodash.each = forEach;
	  lodash.extend = assign;

	  /*------------------------------------------------------------------------*/

	  // Add functions that return unwrapped values when chaining.
	  lodash.escapeRegExp = escapeRegExp;
	  lodash.identity = identity;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isEmpty = isEmpty;
	  lodash.isFunction = isFunction;
	  lodash.isNative = isNative;
	  lodash.isObject = isObject;
	  lodash.isString = isString;

	  /*------------------------------------------------------------------------*/

	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type string
	   */
	  lodash.VERSION = VERSION;

	  /*--------------------------------------------------------------------------*/

	  if (freeExports && freeModule) {
	    // Export for Node.js or RingoJS.
	    if (moduleExports) {
	      (freeModule.exports = lodash)._ = lodash;
	    }
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;