# Registering Components

There are many ways to register new components in BlueRain:

## App or Plugin
The easiest way to add a new component to BlueRain is to use the 'components' static property of you app or plugin:

```javascript
import { Plugin } from '@blueeast/bluerain-os';

const Logo = props => {
  return (
    <div>/* component code */</div>
  )
}

export default class FooPlugin extends Plugin {

	static pluginName = 'FooPlugin';

	static components = {
		Logo
	};
}
```

Note that BlueRain uses 'setOrReplace' method on components registered through the `components` static property of you app or plugin. This means that if there is an existing component of the same name, it will be replaced.

## Using the `set` method of ComponentRegistry
You can add new Components anywhere in the code by calling the `set` method of ComponentRegistry:

```js
import { Plugin } from '@blueeast/bluerain-os';

const Logo = props => {
  return (
    <div>/* component code */</div>
  )
}

export default class FooPlugin extends Plugin {

	static pluginName = 'FooPlugin';

	static initialize(config, ctx) {
		ctx.Components.set('Logo', Logo);
	}
}
```

`set` method will throw an error if some component is already registered on the given key. To avoid this you can use the `setOrReplace` method instead.
