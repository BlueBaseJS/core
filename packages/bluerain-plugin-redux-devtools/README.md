# Redux Devtools Plugin

Adds [Redux Devtools Extension](https://github.com/gaearon/redux-devtools) compatibility to BlueRain OS.

## Usage
Run the following command in the plugin directoy:

```shell
npm i --save @blueeast/bluerain-plugin-redux-devtools
```

Then in your boot function, pass the plugin like this:

```javascript
import BR from '@blueeast/bluerain-os';
import ReduxDevtoolsPlugin from '@blueeast/bluerain-plugin-redux-devtools';

BR.boot({
	plugins: [ReduxDevtoolsPlugin]
})
```

## API
None.
