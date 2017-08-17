# Installation

First install the plugin as a npm package to your project:

```
npm i --save bluerain-plugin-apollo
```

Then import your plugins in your plugins.js file

```js
module.exports = {
    'apollo': require('bluerain-plugin-apollo')
};
```

At last, boot your client with the plugin:

```js
import boot from 'bluerain-core';

const plugins = require('../bluerain/plugins');

boot({ plugins });
```
