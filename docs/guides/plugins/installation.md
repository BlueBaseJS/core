# Installation

First install the plugin as a npm package to your project:

```
npm i --save bluerain-plugin-apollo
```

Then import your plugins in your plugins.js file

```js
const apollo = require('bluerain-plugin-apollo');

module.exports = [apollo];
```

At last, boot your client with the plugin:

```js
import boot from '@blueeast/bluerain-os';

const plugins = require('./plugins');

BR.boot({ plugins });
```
