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

## Filters

This plugin provides complete flexibility to modify the main redux store. This is done by providing various filter hooks at different stages of store initialization. All filter hooks of this plugin are executed during the execution of `bluerain.system.app` filter hook.

### Summary

-   [bluerain.redux.app](#bluerainreduxapp)
-   [bluerain.redux.initialState](#bluerainreduxinitialstate)
-   [bluerain.redux.reducers](#bluerainreduxreducers)
-   [bluerain.redux.reducers.bluerain](#bluerainreduxreducersbluerain)
-   [bluerain.redux.middlewares](#bluerainreduxmiddlewares)
-   [bluerain.redux.enhancers](#bluerainreduxenhancers)
-   [bluerain.redux.composed](#bluerainreduxcomposed)
-   [bluerain.redux.provider](#bluerainreduxprovider)

### bluerain.redux.beforeInit

This hook is executed before anyother hooks are registered or executed.

### bluerain.redux.app

This hook gives the ability to modify the main System App component that gets wrapped in Redux's Provider.

**Parameters:**

| Name      | Type            | Description                    |
| --------- | --------------- | ------------------------------ |
| SystemApp | React.Component | The main system app component. |

**Returns:**

| Name      | Type            | Description                    |
| --------- | --------------- | ------------------------------ |
| SystemApp | React.Component | The main system app component. |

**Example:**

This example wraps the System App with a Redux provider by using a `withRedux` higher order component (HOC).

```javascript
import BR from '@blueeast/bluerain-os';
import withRedux from './withReduxBasedComponent';

BR.Filters(
	'bluerain.redux.app', 
	function AddReduxPluginToSystemApp(App) {
		return withReduxBasedComponent(App);
	}
);
```

### bluerain.redux.initialState

This hook gives the ability to modify the initial state sent to the redux store.

**Parameters:**

| Name         | Type   | Description         |
| ------------ | ------ | ------------------- |
| initialState | Object | initialState Object |

**Returns:**

| Name         | Type   | Description         |
| ------------ | ------ | ------------------- |
| initialState | Object | initialState Object |

**Example:**

This example sets the `bluerain.taskbar.active` state of the redux store to true at system boot time.

```javascript
import BR from '@blueeast/bluerain-os';

BR.Filters.add(
	'bluerain.redux.initialState',
	function ActivateTaskbar(state) {
		return Object.assign({}, state, {
			bluerain: {
				taskbar: {
					active: true
				}
			}
		})
	}
);
```

### bluerain.redux.reducers

This hook gives the ability to modify the redux store's reducer.

**Parameters:**

| Name     | Type   | Description                                                                                                         |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution. |

**Returns:**

| Name     | Type   | Description                                                                                                         |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution. |

**Example:**

This example adds a reducer to bluerain state, which will be accessible at `foo`.

```javascript
import BR from '@blueeast/bluerain-os';
import reducer from './reducer';

BR.Filters.add(
	'bluerain.redux.reducers', 
	function AddReducer(reducers) {
		return Object.assign({}, reducers, {
			foo: 'bar'
		});
	}
);
```

### bluerain.redux.reducers.bluerain

This hook gives the ability to modify the nested bluerain reducer.

**Parameters:**

| Name     | Type   | Description                                                                                                         |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution. |

**Returns:**

| Name     | Type   | Description                                                                                                         |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution. |

**Example:**

This example adds a taskbar reducer to bluerain state, which will be accessible at `bluerain.taskbar`.

```javascript
import BR from '@blueeast/bluerain-os';
import reducer from './reducer';

BR.Filters(
	'bluerain.redux.reducers.bluerain', 
	function AddReducers(reducers) {
		return Object.assign({}, reducers, {
			taskbar: reducer
		})
	}
);
```

### bluerain.redux.middlewares

This hook gives the ability to add or modify custom middlewares to the main redux store.

**Parameters:**

| Name        | Type  | Description                                                                                                                           |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------- |
| middlewares | Array | This is an array of redux middlewares. This array will be sent as a param to the `applyMiddleware` of Redux after callback execution. |

**Returns:**

| Name        | Type  | Description                                                                                                                           |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------- |
| middlewares | Array | This is an array of redux middlewares. This array will be sent as a param to the `applyMiddleware` of Redux after callback execution. |

**Example:**

This example adds a taskbar reducer to bluerain state, which will be accessible at `bluerain.taskbar`.

```javascript
import BR from '@blueeast/bluerain-os';
import customMiddleware from './customMiddleware';

BR.Filters(
	'bluerain.redux.middlewares', 
	function AddMiddleware(middlewares) {
		return middlewares.push(customMiddleware());
	}
);
```

### bluerain.redux.enhancers

This hook gives the ability to modify the redux enhancers array. After execution, this array will be sent to the redux's `compose` function.

**Parameters:**

| Name        | Type  | Description                                                                                                                                                                                                 |
| ----------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enhancers   | Array | This is an array of redux enhancers. This array will be sent as a param to the `compose` of Redux after callback execution.                                                                                 |
| middlewares | Array | This is an array of redux middlewares. This array was used to create the enhancer (by passing as a param to `applyMiddleware` function) that was sent inside the array as the first param of this function. |

**Returns:**

| Name      | Type  | Description                                                                                                                 |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------- |
| enhancers | Array | This is an array of redux enhancers. This array will be sent as a param to the `compose` of Redux after callback execution. |

### bluerain.redux.composed

This hook gives the ability to modify the final composed `enhancers` array (by passing enhancers array as a parameter to the `compose` function), right before they are used in the redux store.
**Parameters:**

| Name      | Type  | Description                                                                                                                                                  |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| composed  | Array | This is the composed enhancers array (by passing `enhancers` array as a parameter to the `compose` function), right before they are used in the redux store. |
| enhancers | Array | This is an array of redux middlewares. This array was passed as a parameter to the `compose` function. The result was as the first param of this function.   |

**Returns:**

| Name     | Type  | Description                                                                                                                                                  |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| composed | Array | This is the composed enhancers array (by passing `enhancers` array as a parameter to the `compose` function), right before they are used in the redux store. |

### bluerain.redux.provider

This hook gives the ability to modify the Provider component of the redux store.

**Parameters:**

| Name     | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| Provider | Provider | The react-redux Provider component |

**Returns:**

| Name     | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| Provider | Provider | The react-redux Provider component |

**Example:**

This example replaces the original provider with Apollo's provider.

```javascript
import BR from '@blueeast/bluerain-os';
import { ApolloProvider } from 'react-apollo';

BR.Filters(
	'bluerain.redux.provider', 
	function ChangeProvider(Provider) {
		return ({ store, children }) => (<ApolloProvider store={store} client={client}>{children}</ApolloProvider>);
});
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### ReduxPlugin

**Extends Plugin**

Add Redux state management to BlueRain Apps

**Properties**

-   `pluginName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** "Redux"
-   `slug` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** "redux"

### StoreRef

This plugin saves `store` object in the BlueRain context. This can be accessed in the following way:

```javascript
const store = ctx.refs.store;
```
