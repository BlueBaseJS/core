# Redux Plugin

Adds Redux state management.

## Usage
Run the following command in the plugin directoy:

```shell
npm i --save @blueeast/bluerain-plugin-redux
```

Then in your boot function, pass the plugin like this:

```javascript
import BR from '@blueeast/bluerain-os';
import ReduxPlugin from '@blueeast/bluerain-plugin-redux';

BR.boot({
	plugins: [ReduxPlugin]
})
```

## API
API Docs