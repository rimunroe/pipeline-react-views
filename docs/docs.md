## manually do a lot boilerplate nonsense

```coffee
app.create.view 'foo',
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
    @setState foo: app.stores.foo.getFoos()

  onBarChange: ->
    @setState bar: app.stores.bar.getBars()

  render: ->
```

## register and unregister via mixin and manually call @setState in onChange functions

```coffee
app.create.view 'foo',
  mixins: app.reactMixin(['foo', 'bar'])

  getInitialState: ->
    foo: @stores.foo.getFoos()
    bar: @stores.bar.getBars()

  onFooChange: ->
    @setState foo: @stores.foo.getFoos()

  onBarChange: ->
    @setState bar: @stores.bar.getBars()

  render: ->
```

## super concise shorthand where change functions return new state

```coffee
app.create.view 'foo',
  stores:
    foo: -> foo: @stores.foo.getFoos()
    bar: -> bar: @stores.bar.getBars()

  render: ->
```

