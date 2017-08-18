---
title: Component Registry
---



## Registering Components

You can register component with the `registerComponent` method:

```js
import { registerComponent } from 'bluerain-client-services/lib/ComponentRegistry';

const Logo = props => {
  return (
    <div>/* component code */</div>
  )
} 
registerComponent('BluerainLogo', Logo);
```
You can also add HOCs to the register component by adding HOCs in third argument.
```
registerComponent('BluerainLogo', Logo, withSystemNav, withRouter);
```

## Checking Component

A method to check if component is registered or not. It return `true` if specified component is registered.

```js
import { hasComponent } from 'bluerain-client-services/lib/ComponentRegistry';


hasComponent('BluerainLogo');
```

## Getting Component

This function returns react component of the registered component. 

```js
import { getComponent } from 'bluerain-client-services/lib/ComponentRegistry';


getComponent('BluerainLogo');
```



## Accessing Raw Components


We can access the  raw component by using `getRawComponent` function, provided said component has been registered with `registerComponent`:

```
import { getRawComponent } from 'bluerain-client-services/lib/ComponentRegistry';


getRawComponent('BluerainLogo');
```

## Replacing Components


If you only need to modify a single component, you can simply override it with a new one without having to touch the `replaceComponent` function.

For example, if you wanted to use your own `CustomLogo` component you would do:

```js
import { replaceComponent } from 'bluerain-client-services/lib/ComponentRegistry';

const CustomLogo = props => {
  return (
    <div>/* custom component code */</div>
  )
}
replaceComponent('BluerainLogo', CustomLogo);
```

Note that `replaceComponent` will preserve any HoCs originally defined using `registerComponent`. In other words, in the following example:

```js
registerComponent('BluerainLogo', Logo, withSystemNav, withRouter);
replaceComponent('BluerainLogo', CustomLogo);
```

The `CustomLogo` component will also be wrapped with `withSystemNav` and `withRouter`.

Once you've replaced the `Logo` component with your own `CustomLogo`, `Logo` will now point to `CustomLogo`.


