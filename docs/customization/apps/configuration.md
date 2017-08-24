# Configuration

Some times apps may need to have custom configurations for each differentusage. For example, a Hello World app may have the option to have a customizable hello message.

## Usage
Apps can be configured in the `config.apps` object, where `config` is the object that is passed to the `boot` method.

So to configure the Hello World app create an object at `config.apps[${slug}]` where `slug` is the app's slug. 

To find out what configurations a app needs, please refer to the app documentation.

## Accessing configurations inside App
The app specific configurations are passed to the initialize method of the app class at system boot time.

```javascript
import { App } from 'bluerain-os';

class HelloWorldApp extends App {

	static appName = 'Hello World';
	static slug = 'hello-world';
	
	initialize(config) {
		super(config);
		
		// use config here
	}
}
```
## Example Usage
To use the Hello World app, first create a `apps` file (or edit your existing one), and import the app. This app's `slug` is `hello-world`.

```javascript
const helloWorldApp = require('bluerain-app-hello-world');

module.exports = [helloWorldApp]
```
Now create a new `config.js` file (or edit your existing one) and put the following content in this file:

```javascript
module.exports = {
	apps: {
		'hello-world': {
			'helloMessage': 'Hi World!'
		}
	}
}
```
Note that we used the same custom key here to reference the app.
 
At last, boot your client with the app:

```js
import boot from 'bluerain-core';

const config = require('./config');
const apps = require('./apps');

boot({ config, apps });
```
 