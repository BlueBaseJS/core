# Extending Components

Components are generally defined as functional stateless components, unless they contain extra logic (lifecycle methods, event handlers, etc.) in which case they'll be defined as ES6 classes.

For components defined as ES6 classes, make sure you `extend` the original component. This will let you pick and choose which methods you actually need to replace, while inheriting the ones you didn't specify in your new component.

In order to extend the original, non-wrapped component we use the `getRawComponent` method:

```javascript
class CustomLogo extends BR.Components.getRawComponent('Logo'){
  render() {
    return (
      <div>/* custom component code */</div>
    )
  }
}
BR.Components.replace('Logo', CustomLogo);
```
