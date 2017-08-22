# Creating an App

Each app in BlueRain is essentially a React Compoent, that renders during system lifecycle.

Let's learn by building a Hello World app.

To create an app, we need to create a React Component and extend it from BlueRain's `App` component.

Now let's create the main app component:

```javascript
import React from 'react';
import { App } from 'bluerain-os';

class HelloWorldApp extends App {

	static appName = HelloWorldApp;
	static slug = 'hello-world';
	
	render() {
		const { appName } = this.constructor;
		return (
			<div>
		      <h1>Hello World!</h1>
		      <p>This is BlueRain's {appName} app!</p>
		    </div>
	    );
	}
}
```
Notice that we also defined `appName` and `slug` static properties. 

- `appName` defines the name of the app. This is a required property and not providing one will throw error when you register the app. 

- `slug` property defines the url slug for your app. In this case the app's url will be `/app/hello-world`. If you don't give one, then BlueRain will automatically create a slug by kebab casing the `appName` property. It's a good convention manually define the `slug`.

You can define even more App properties. For a complete list, please refer to the [API Reference](../../api/reference.md).

## Extending React's Component

It is also possible to extend the default React Component. You may do this if you don't wish to use extra helper methods that come in the `App` class.

So the same app can be created as:

```javascript
import React from 'react';

class HelloWorldApp extends React.Component {

	static appName = HelloWorldApp;
	static slug = 'hello-world';
	
	render() {
		const { appName } = this.constructor;
		return (
			<div>
		      <h1>Hello World!</h1>
		      <p>This is BlueRain's {appName} app!</p>
		    </div>
	    );
	}
}
```

## As a Stateless Functional Component
Since each app is just a React Component, it is also possible to create an app as a stateless functional component.

```javascript
const HelloWorldApp = () => <div>Hello World!</div>;

HelloWorldApp.appName = 'Hello World';
HelloWorldApp.slug = 'hello-world';
```

## Routes
Since BlueRain uses React Router 4, each app can add it's own routes.