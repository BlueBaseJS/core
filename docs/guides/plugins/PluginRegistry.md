# PluginRegistry

BlueRain uses a system of plugins for many of its operations.All the system plugins are stored in pluginRegistry. It can be accessed by :
```
BR.Plugins
```

## Adding an plugin

For example, here's how you would add a plugin to the system. The plugin will be registered against plugin slug:

```js
import Plugin from './Plugin
import BR from '@blueeast/bluerain-os';

BR.Plugins.set(Plugin);
``` 
If plugin slug is not given, it is generated through the plugin name

## Adding multiple Plugins

Multiple plugins can also be registered at once using `registerMany` function:

```js
import Plugin1 from './Plugin1;
import Plugin2 from './Plugin2;
import Plugin3 from './Plugin3;
import BR from '@blueeast/bluerain-os';

BR.Plugins.set([Plugin1, Plugin2, Plugin3]);
```


## Initializing all plugins

All the registered plugins can be initialized using the `BR.Plugins.initializeAll` function:

```js
import BR from '@blueeast/bluerain-os';

BR.Plugins.initializeAll();
```
