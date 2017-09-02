# Components
BlueRain stores components which can be dynamically used and replaced. This plays a major role in creating a pluggable and modular system.

## Registering Components

You can add new Components with the `register` method:

```js
import BR from '@blueeast/bluerain-os';

const Logo = props => {
  return (
    <div>/* component code */</div>
  )
}
BR.Components.register('Logo', Logo);
```

### Components & HoCs

To understand how theming works in BlueRain, it's important to understand how components and higher-order components (HoCs) interact. 

A higher-order component's role is to wrap a regular component to pass it a specific prop (such as a list of posts, the current user, the `Router` object, etc.). You can think of HoCs as specialized assistants that each hand the component a tool it needs to do its job. 

The first argument of `register` is the component's name, the second is the component itself, and any successive arguments will be interpreted as higher-order components and wrapped around the component.

For example, this is how you'd pass the `currentUser` object to the `Logo` component:

```js
BR.Components.register('Logo', Logo, withCurrentUser);
```

### "Delayed" HoCs

There are a few subtle differences between registering a component with `register` and the more standard `export default Foo` and `import Foo from './Foo.jsx'` ES6 syntax. 

First, you can only override a component if it's been registered using `register`. This means that if you're building any kind of theme or plugin and would like end users to be able to replace specific components, you shouldn't use import/export. 

Second, both techniques also lead to different results when it comes to higher-order components (more on this below). If you write `export withCurrentUser(Foo)`, the `withCurrentUser` function will be executed immediately, which will trigger an error because the fragment it depends on isn't properly initialized yet. 

On the other hand, `register('Foo', Foo, withCurrentUser)` *doesn't* execute the function (note that we write `withCurrentUser` and not `withCurrentUser()`), delaying execution until app's initialization. 

But what about HoC functions that take arguments? For example if you were to write:

```js
BR.Components.register('PostsList', PostsList, withList(options));
```

The `withList(options)` would be executed immediately, and you would have no way of overriding the `options` object later on (a common use case being overriding a fragment).

For that reason, to delay the execution until the start of the app, you can use the following alternative syntax:

```js
BR.Components.register('PostsList', PostsList, [withList, options]);
```
### Accessing Raw Components

Going back to our example:

```
const WrappedComponent = withCurrentUser(MyComponent);
```

This would result a *new* `WrappedComponent` component that has `MyComponent` as a child. This has the consequence that properties and objects you set on `MyComponent` might not exist on `WrappedComponent`. 

For that reason, BlueRain provides a `getRawComponent` utility that lets you access the unwrapped “raw” component, provided said component has been registered with `register`:

```
MyComponent.foo = "bar";
const WrappedComponent = BR.Components.register(MyComponent, withCurrentUser);
console.log(WrappedComponent.foo); // undefined
console.log(BR.Components.getRawComponent(WrappedComponent).foo); // "bar"
```

## Replacing Components

For example, if you wanted to use your own `CustomLogo` component you would do:

```js
import BR from '@blueeast/bluerain-os';

const CustomLogo = props => {
  return (
    <div>/* custom component code */</div>
  )
}
BR.Components.replace('Logo', CustomLogo);
```

Note that `replace` will preserve any HoCs originally defined using `register`. In other words, in the following example:

```js
BR.Components.register('Logo', Logo, withCurrentUser, withRouter);
BR.Components.replace('Logo', CustomLogo);
```

The `CustomLogo` component will also be wrapped with `withCurrentUser` and `withRouter`.

Once you've replaced the `Logo` component with your own `CustomLogo`, `BR.Components.get('Logo')` will now return `CustomLogo`. If you want an easy way to keep track of which components have been customized, you could add a `custom` attribute when calling the component as a reminder for yourself:

```js
import BR from '@blueeast/bluerain-os';
const Logo = BR.Components.get('Logo');

const CustomHeader = props => {
  return (
    <div>
      <Logo custom />
    </div>
  )
}
```

## Extending Components

Components are generally defined as functional stateless components, unless they contain extra logic (lifecycle methods, event handlers, etc.) in which case they'll be defined as ES6 classes.

For components defined as ES6 classes, make sure you `extend` the original component. This will let you pick and choose which methods you actually need to replace, while inheriting the ones you didn't specify in your new component.

In order to extend the original, non-wrapped component we use the `getRawComponent` method:

```js
class CustomLogo extends BR.Components.getRawComponent('Logo'){
  render() {
    return (
      <div>/* custom component code */</div>
    )
  }
}
BR.Components.replace('Logo', CustomLogo);
```

#### Alternative Approach

The main purpose behind the components API is to enable extending and replacing components defined in third-party themes and plug-ins. However, if this is not a concern for you, you can use the standard `export default Foo` and `import Foo from './foo.jsx'` approach without any trouble.
