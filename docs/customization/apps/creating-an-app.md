# Creating an App

Each app is essentially a React Compoent, that renders during system lifecycle.

Let's learn by building a Hello World app.

To build an app, we need to import `App` Component and `buildApp` method.

```javascript
import { App, buildApp } from 'bluerain-os';

```

Now let's create the main app component:


```javascript
class HelloWorldApp extends App {
	render() {
		return (<div>hello world</div>);
	}
}
```

Note that we could also extend the default React Component but extending BlueRain's App adds extra funcionality.

Finally, we now need to build our app with some properties:

```
const ass = buildApp(HelloWorldApp, { appName: 'Hello World' });
```

Since BlueRain uses React Router 4, each app can add it's own routes.