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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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

	var _ = __webpack_require__(2);
	var React = __webpack_require__(3);

	module.exports = function (_app) {

	  var onChange = function (storeName) {
	    var StoreName = storeName.charAt(0).toUpperCase() + storeName.slice(1);
	    return "on" + StoreName + "Change";
	  };

	  var reactMixin = function (storeNames, viewName) {
	    return {
	      stores: _app.stores,
	      componentWillMount: function(){
	        var that = this;
	        _.forEach(storeNames, function(storeName){
	          if (!_app.stores[storeName]) {
	            throw new Error("\"" + viewName + "\" tried to subscribe to \"" + storeName + "\", but it didn't exist.  FYI, views must be created after stores.");
	          }
	          // this.stores[storeName] = _app.stores[storeName];
	          changeCb = that[onChange(storeName)];
	          if (_.isFunction(changeCb)) {
	            changeCb();
	            _app.dispatcher.registerStoreCallback(storeName, changeCb, viewName);
	          } else {
	            throw new Error("\"" + viewName + "\" attempted to subscribe to \"" + storeName + "\" but the view did not have a \"" + onChange(storeName) + "\" method.");
	          }
	        });
	      },
	      componentWillUnmount: function(){
	        var that = this;
	        _.forEach(storeNames, function(storeName){
	          changeCb = that[onChange(storeName)];
	          if (_.isFunction(changeCb)) {
	            _app.dispatcher.unregisterStoreCallback(storeName, changeCb, viewName);
	          }
	        });
	      }
	    };
	  };

	  return function createView (viewName, options) {

	    if (_app.hasStarted) {
	      throw new Error("cannot create new view \"" + viewName + "\". App has already started.");
	    }

	    var storeNames = _.keys(options.stores) || [];
	    var storeCallbacks = {};

	    _.forEach(options.stores, function(cb, storeName){
	      storeCallbacks[onChange(storeName)] = cb;
	    });

	    delete options.stores;
	    _.extend(options, storeCallbacks);

	    if (storeNames != null) {
	      options.mixins = options.mixins || [];
	      options.mixins.push(reactMixin(storeNames, viewName));
	    }

	    options.displayName = viewName.charAt(0).toUpperCase() + viewName.replace( /([A-Z])/g, " $1" ).slice(1);

	    options.actions = _app.actions;
	    // options.views = _app.views;
	    options.helpers = _app.helpers;

	    var view = React.createFactory(React.createClass(options));

	    // _app.views[viewName] = view;

	    return view;
	  };
	};


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
