# Configuration

Some times plugins may need to have custom usage options for each usage. For example, a Google Analytics plugin will need a custom Tracking ID which will be different in each project.

## Usage
Plugins can be configured in the `config.plugins` object, where `config` is the object that is passed to the `boot` method.

So to configure the Google Analytics plugin create an object at `config.plugins[${PLUGIN_KEY}]` where `PLUGIN_KEY` is the custom name used in the `plugins` object for the same plugin. 

To find out what configurations a plugin needs, please refer to the plugin documentation.

## Accessing configurations inside Plugin
The plugin specific configurations are passed to the constructor of the plugin class at system boot time.

```javascript
import { Plugin } from 'bluerain-os';

class GoogleAnalyticsPlugin extends Plugin {

	constructor(config) {
		super(config);
		
		// use config here
	}
}
```

## Example Usage
To use the Google Analytics plugin, first create a `plugins` file (or edit your existing one), and import the plugin. For this plugin we are use the custom key `'google-analytics'`.

```javascript
module.exports = {
	'google-analytics': require('bluerain-plugin-google-analytics')
}
```
Now create a new `config.js` file (or edit your existing one) and put the following content in this file:

```javascript
module.exports = {
	plugins: {
		'google-analytics': {
			'tracking-id': 'GOOGLE_ANALYTICS_TRACKING_ID'
		}
	}
}
```
Note that we used the same custom key here to reference the plugin.
 
At last, boot your client with the plugin:

```js
import boot from 'bluerain-core';

const config = require('../bluerain/config');
const plugins = require('../bluerain/plugins');

boot({ config, plugins });
```
 