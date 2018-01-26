# Installation

First install the app as a npm package to your project:

```shell
yarn add bluerain-app-hello-world
```

Then import your apps in your bluerain.js file

```javascript
// bluerain.js
{
	// ...
	apps: [
		require('bluerain-app-hello-world'),
	]
	// ...
}
```

Finally, just boot your project on your desired platform by executing the following command on your terminal:

```shell
bluerain run web
```
