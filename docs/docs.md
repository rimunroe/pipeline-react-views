### manually do a lot boilerplate nonsense

```coffee
FooView = React.createFactor React.createClass
  displayName: "Foo View"
  getInitialState: ->
    foos: app.stores.foo.getFoos()
    bars: app.stores.bar.getBars()

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

* pipeline-react-views doesn't currently implement this syntax (because the next one is so much nicer) but it may at some point, if there is a need to break out of the shorthand.

```coffee
FooView = React.createFactor React.createClass
  displayName: "Foo View"
  mixins: app.reactMixin({foo: 'onFooChange', bar: 'onBarChange'})

  getInitialState: ->
    foos: @stores.foo.getFoos()
    bars: @stores.bar.getBars()

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
  * applies a humanized `displayName` for you
  * binds change callbacks to component context for you
  * gets store data for all stores on `getInititalState`
  * registers store change callbacks for you on `componentDidMount`
  * calls `setState` for you
  * unregisters store change callbacks on `componentWillUnmount`
  * puts a reference to the component's factory on `app.views`
  * puts `this.stores`, `this.views` and `this.actions` on the component

###### So all you have to write is:  

Either of those following blocks of code will basically produce the same component as the as the first block listed above.  

```coffee
app.create.view 'foo',
  stores:
    foo: -> foo: @stores.foo.getFoos()
    bar: -> bar: @stores.bar.getBars()

  render: ->
    div className: 'foos', _.map @state.foos, (foo) -> 
      div className: 'foo', foo.name
```

###### For the JSX crowd: 

```js
app.create.view('foo', {
  stores: {
    foo: function() {
      return {foo: this.stores.foo.getFoos()};
    },
    bar: function() {
      return {bar: this.stores.bar.getBars()};
    }
  },
  render: function() {
    return <div className={'foos'}> 
      _.map(this.state.foos, function(foo) {
        return <div className={'foo'}> foo.name </div>
      });
    </div>
  }
});
```
