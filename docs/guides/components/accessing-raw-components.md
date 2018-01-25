# Accessing Raw Components

Going back to our example:

```javascript
const WrappedComponent = withCurrentUser(MyComponent);
```

This would result a *new* `WrappedComponent` component that has `MyComponent` as a child. This has the consequence that properties and objects you set on `MyComponent` might not exist on `WrappedComponent`. 

For that reason, BlueRain provides a `getRawComponent` utility that lets you access the unwrapped “raw” component, provided said component has been registered with `set`:

```javascript
MyComponent.foo = "bar";
const WrappedComponent = BR.Components.set(MyComponent, withCurrentUser);
console.log(WrappedComponent.foo); // undefined
console.log(BR.Components.getRawComponent(WrappedComponent).foo); // "bar"
```
