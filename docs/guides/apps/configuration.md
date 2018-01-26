# Configuration

Some times apps may need to have custom configurations for different projects. For example, a Hello World app may have the option to have a customizable hello message.

## Usage
App configurations can be added to the `config` object int `bluerain.js` file. Continueing on our "Hello World" app example, this is what it's custom configurations will look like:

```javascript
// bluerain.js
{
	// ...
	config: {
		apps: {
			'hello-world': {
				'helloMessage': 'Hi World!'
			}
		}
	}
	// ...
}
```

To find out what configurations an app needs, please refer to the app documentation.


## Accessing configurations inside App
The app specific configurations are passed to the initialize method of the app class at system boot time.

```javascript
import { App } from 'bluerain-os';

class HelloWorldApp extends App {

	static appName = 'Hello World';
	static slug = 'hello-world';
	
	static initialize(config, ctx) {
		console.log(configs.helloMessage);
	}
}
```

## Accessing App Configs via Context
App configs can also be accessed anywhere in the project through BlueRain context:

```javascript
import { withBlueRain } from 'bluerain-os';

const SomeComponent = (props) => {

	const BR = props.bluerain;
	const Text = BR.Components.get('Text');
	const config = BR.Configs.get('apps.hello-world');

	return <Text>{config.helloMessage}</Text>
}

export default withBlueRain(SomeComponent);
```
