# Creating a Plugin

All plugins in BlueRain OS extend the Plugin Class.

## Example: Adding a new page

**index.js**

```js
import { Plugin } from 'bluerain-os';
import HelloWorldComponent from './HelloWorldComponent';

class HelloWorldPlugin extends Plugin {

    initialize() {

        addCallback('bluerain.routes', (routes) => {
            routes.push({
                path: '/hello-world',
                component: HelloWorldComponent
            })
        });
    }
}

export default HelloWorldPlugin;
```

**HelloWorldComponent.js**

```js
// Write code here
```

## Example: Modifying existing page layout

**index.js**

```js
// Write code here
```



