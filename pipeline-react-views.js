(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["_"], factory);
	else if(typeof exports === 'object')
		exports["pipeline-react-views"] = factory(require("_"));
	else
		root["pipeline-react-views"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;