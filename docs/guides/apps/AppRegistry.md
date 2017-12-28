# AppRegistry

BlueRain uses a system of apps for many of its operations.All the system apps are stored in appRegistry. It can be accessed by :
```
BR.Apps
```

## Adding an app

For example, here's how you would add a app to the system. The app will be registered against app slug:

```js
import App from './App
import BR from '@blueeast/bluerain-os';

BR.Apps.set(App);
``` 
If app slug is not given, it is generated through the plugin name

## Adding multiple Apps

Multiple apps can also be registered at once using `registerMany` function:

```js
import App1 from './App1
import App2 from './App2
import App3 from './App3
import BR from '@blueeast/bluerain-os';

BR.Apps.set([App1, App2, App3]);
```

## Getting all apps routes

All the routes of registered apps can be get using the `BR.Apps.getAllRoutes` function:

```js
import BR from '@blueeast/bluerain-os';

BR.Apps.getAllRoutes();
```


## Initializing all apps

All the registered apps can be initialized using the `BR.Apps.initializeAll` function:

```js
import BR from '@blueeast/bluerain-os';

BR.Apps.initializeAll();
```
