## Platform
Extends ReactXP's platform api to add support for `server` and `electron` platforms.

```javascript
import BR from '@blueeast/bluerain-os';

console.log(BR.Platform.getType());
```
## BR.Utils.parseJsonSchema
New way to parse json schemas:

```javascript
import BR from '@blueeast/bluerain-os';
BR.Utils.parseJsonSchema(schema);
```

## Boot
Boot now returns System App component. It is now also possible to disable automatic rendering of the app during boot. With this option the developer can manage the rendering himself.

```javascript
import BR from '@blueeast/bluerain-os';

const BlueRainApp = BR.boot({ renderApp: false });
```

## SSR
`bootOnServer` method is removed. Instead pass the `serverMode` flag to boot:

```javascript
import BR from '@blueeast/bluerain-os';

const BlueRainApp = BR.boot({ serverMode: true });
```

## Context
Plugin and App `initialize` functions get BlueRain context as second params.