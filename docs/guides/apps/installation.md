# Installation

First install the app as a npm package to your project:

```
npm i --save bluerain-app-hello-world
```

Then import your apps in your apps.js file

```js
const apollo = require('bluerain-app-hello-world');

module.exports = [apollo];
```
For web and electron BluerainOs assumes that your main page will have a DOM element container called “app-container”. The root view of the app will be rendered within this container. Typically, this DOM element will be a `<div>` that covers the entire page.
At last, boot your client with the app.:

```js
import BR from '@blueeast/bluerain-os';

const apps = require('./apps');
BR.boot({ apps });
```
Boot now returns System App component. It is now also possible to disable automatic rendering of the app during boot. With this option the developer can manage the rendering himself.

```javascript
import BR from '@blueeast/bluerain-os';

const BlueRainApp = BR.boot({ renderApp: false });
```