# Creating a Plugin

All plugins in BlueRain OS extend the Plugin Class.

Let's create a simple plugin that registers a new route `/hello-world`. When this route is called, `HelloWorldComponent` component should be rendered.

```js
import { Plugin } from 'bluerain-os';
import HelloWorldComponent from './HelloWorldComponent';

class HelloWorldPlugin extends Plugin {

	static pluginName = HelloWorldPlugin;
	static slug = 'hello-world';
	
    initialize(config, ctx) {

        ctx.Callbacks.add('bluerain.routes', (routes) => {
            routes.push({
                path: '/hello-world',
                component: HelloWorldComponent
            })
        });
    }
}

export default HelloWorldPlugin;
```
Notice that we also defined `pluginName ` and `slug` static properties. 

- `pluginName ` defines the name of the plugin. This is a required property and not providing one will throw error when you register the plugin. 

- `slug` property defines the slug for your plugin. If you don't give one, then BlueRain will automatically create a slug by kebab casing the `pluginName` property. It's a good convention manually define the `slug`. This slug is used to get an app from the `PluginRegistry`.

You can define even more Plugin properties. For a complete list, please refer to the [API Reference](../../api/reference.md).