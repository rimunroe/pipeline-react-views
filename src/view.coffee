_ = require 'lodash'

cb_internal_name = (store_name) -> "_pipeline_get_#{store_name}_state_function"

# cb_change_name = (store_name) -> "on#{store_name}Change"

humanize = (string) ->
  if not _.isString(string) then string = ''
  string.charAt(0).toUpperCase() + string.replace( /([A-Z])/g, " $1" ).slice(1)

module.exports = (React) ->
  make_create_view = (_app) ->
    if !(_app?.dispatcher?.registerStoreCallback?)
      throw new Error "Couldn't add 'create.view' to _app because _app was buggered."

    mixin = (store_names, view_name) ->
      getInitialState: ->
        _.reduce(store_names, (initital_state, store_name) =>
          _.extend(initital_state, @[cb_internal_name(store_name)]('get'))
        ,{})

      componentDidMount: ->
        _.each store_names, (store_name) =>
          if !_app.stores[store_name]
            throw new Error "#{view_name} attempted to subscribe to #{store_name} but that store didn't exist."
          _app.dispatcher.registerStoreCallback(store_name, @[cb_internal_name(store_name)], view_name)

      componentWillUnmount: ->
        _.each store_names, (store_name) =>
          _app.dispatcher.unregisterStoreCallback(store_name, @[cb_internal_name(store_name)], view_name)

    create_view = (view_name, options) ->
      if _app.hasStarted
        throw new Error "Cannot createa new view #{view_name}.  App has alreay started."

      if _.isArray options.stores
        throw new Ereror "Stores as array of keys hasn't been implemnted yet"

      store_names = _.keys(options.stores)

      storeRefs = {}

      _.each options.stores, (cb, store_name) ->
        options[cb_internal_name(store_name)] = (opt) ->
          state = cb.call(this)
          if opt is 'get'
            return state
          else
            if @isMounted()
              @setState(state)
            else
              console.log("Error: Attempted to update state for '#{view_name}' on '#{store_name}' change, but component wasn't mounted")

        storeRefs[store_name] = _app.stores[store_name]
        # TODO:  investigate this for the case of bogus refs based on load order.

      if not _.isEmpty(store_names)
        options.mixins = options.mixins || []
        options.mixins.push(mixin(store_names, view_name))

      options.stores = storeRefs


      _app.views = {} unless _.isObject(_app.views)

      _.extend options,
        displayName: humanize(view_name)
        actions: _app.actions
        views: _app.views

      view = React.createFactory(React.createClass(options))

      _app.views[view_name] = view

      return view

    return create_view

