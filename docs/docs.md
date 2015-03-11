### manually do a lot boilerplate nonsense

```coffee
FooView = React.createFactor React.createClass
  displayName: "Foo View"
  getInitialState: ->
    foo: app.stores.foo.getFoos()
    bar: app.stores.bar.getBars()

  componentDidMount: ->
    app.dispatcher.register 'foo', @onFooChange
    app.dispatcher.register 'bar', @onBarChange

  componentWillUnmount: ->
    app.dispatcher.unregister 'foo', @onFooChange
    app.dispatcher.unregister 'bar', @onBarChange

  onFooChange: ->
    @setState foos: app.stores.foo.getFoos()

  onBarChange: ->
    @setState bars: app.stores.bar.getBars()

  render: ->
    div className: 'foos', _.map @state.foos, (foo) -> 
      div className: 'foo', foo.name
```

### register and unregister via mixin and manually call @setState in onChange functions

* pipeline-react-views doesn't current implement this syntax (becuase the next one is so much nice) but it may at some point, if there is a neede to break out of the shorthand.  

```coffee
FooView = React.createFactor React.createClass
  displayName: "Foo View"
  mixins: app.reactMixin({foo: 'onFooChange', bar: 'onBarChange'})

  getInitialState: ->
    foo: @stores.foo.getFoos()
    bar: @stores.bar.getBars()

  onFooChange: ->
    @setState foos: @stores.foo.getFoos()

  onBarChange: ->
    @setState bars: @stores.bar.getBars()

  render: ->
    div className: 'foos', _.map @state.foos, (foo) -> 
      div className: 'foo', foo.name
```

### pipeline-react-views shorthand where change functions return new state

pipeline-create-views provides the `create.view` constructor which: 
  * applies displayName for you
  * runs gets store data for all stores on `getInititalState`
  * regsiters store change callbacks for you on `componentDidMount`
  * calls `setState` for you
  * unregisters store change callbacks on `componentWillUnmount`
  * puts a reference to the component's factor on `app.views`

```coffee
app.create.view 'foo',
  stores:
    foo: -> foo: @stores.foo.getFoos()
    bar: -> bar: @stores.bar.getBars()

  render: ->
    div className: 'foos', _.map @state.foos, (foo) -> 
      div className: 'foo', foo.name
```

