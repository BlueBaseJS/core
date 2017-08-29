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

At last, boot your client with the app:

```js
import boot from 'bluerain-core';

const apps = require('./apps');

boot({ apps });
```
