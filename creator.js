var _ = require('lodash');
var React = require('react');

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
