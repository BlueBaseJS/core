# ConfigRegistry

BlueRain uses a system of Configs for many of its operations.All the system Configs are stored in ConfigRegistry. It can be accessed by :
```
BR.Configs
```

## Adding an Config

For example, here's how you would add a Config to the system. The config value will be registered against key:

```js
import BR from '@blueeast/bluerain-os';


BR.Configs.set('plugins.apollo', {networkInterface:
{uri:'localhost:8000/graphql'}
});
``` 

## Getting an Config

The config value can be get against the  key:

```js
import BR from '@blueeast/bluerain-os';


BR.Configs.get('plugins.apollo');
``` 
It will return the registered config object of apollo plugin.

## Adding multiple Configs

`registerMany` function merge the config object with the incoming config object:

```js
import config from './Config;
import BR from '@blueeast/bluerain-os';

BR.Configs.registerMany(config);
```

