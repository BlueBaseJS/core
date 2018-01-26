# Replacing Components

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

Note that `replace` will preserve any HoCs originally defined using `set`. In other words, in the following example:

```js
BR.Components.set('Logo', Logo, withCurrentUser, withRouter);
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
