(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react"], factory);
	else if(typeof exports === 'object')
		exports["pipeline-react-views"] = factory(require("lodash"), require("react"));
	else
		root["pipeline-react-views"] = factory(root["lodash"], root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	module.exports = {
	  name: 'pipeline-react-views',
	  factories: {
	    view: creator
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React, _, cb_internal_name, make_create_view;

	_ = __webpack_require__(2);

	React = __webpack_require__(3);

	cb_internal_name = function(store_name) {
	  return "_pipeline_get_" + store_name + "_state_function";
	};

	({
	  humanize: function(string) {
	    if (!_.isString(string)) {
	      string = '';
	    }
	    return string.charAt(0).toUpperCase() + string.replace(/([A-Z])/g, " $1").slice(1);
	  }
	});

	make_create_view = function(_app) {
	  var create_view, mixin, ref;
	  if (!((_app != null ? (ref = _app.dispatcher) != null ? ref.registerStoreCallback : void 0 : void 0) != null)) {
	    throw new Error("Couldn't add 'create.view' to _app because _app was buggered.");
	  }
	  mixin = function(store_names, view_name) {
	    return {
	      componentWillMount: function() {
	        return _.each(store_names, (function(_this) {
	          return function(store_name) {
	            var change_cb;
	            if (!_app.stores[store_name]) {
	              throw new Error(view_name + " attempted to subscribe to " + store_name + " but that store didn't exist.");
	            }
	            _this.stores[store_name] = _app.stores[store_name];
	            change_cb = _this[cb_internal_name(store_name)];
	            if (_.isFunction(change_cb)) {
	              change_cb();
	              return _app.dispatcher.registerStoreCallback(store_name, change_cb, view_name);
	            } else {
	              throw new Error(view_name + " attempted to subscribe to " + store_name + " with something other than a function");
	            }
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
	    var actions, cbs, view;
	    if (_app.hasStarted) {
	      throw new Error("Cannot createa new view " + view_name + ".  App has alreay started.");
	    }
	    if (_.isArray(options.stores)) {
	      throw new Ereror("Stores as array of keys hasn't been implemnted yet");
	    }
	    cbs = _.reduce(options.stores, (function(cbs, cb, store_name) {
	      cbs[cb_internal_name(store_name)] = (function() {
	        return this.setState(cb.call(this));
	      });
	      return cbs;
	    }), {});
	    delete options.stores;
	    _.extend(options, cbs);
	    if (typeof store_names !== "undefined" && store_names !== null) {
	      options.mixins = options.mixins || [];
	      options.mixins.push(mixin(store_names, view_name));
	    }
	    _.extend(options, {
	      displayName: humanize(view_name)
	    }, actions = _app.actions);
	    options.views = _app.views;
	    view = React.createFactory(React.createClass(options));
	    _app.views[view_name] = view;
	    return view;
	  };
	  return create_view;
	};

	module.exports = make_create_view;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;