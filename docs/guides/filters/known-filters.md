# Hooks

These are the known callback hooks in the system:

- [System App](#system-app)
	-	[bluerain.system.app](#bluerainsystemapp)
	-	[bluerain.system.routes](#bluerainsystemroutes)
- [System Lifecycle Events](#system-lifecycle-events)
	-	[bluerain.system.boot.start](#bluerainsystembootstart)
	-	[bluerain.system.configurations.loaded](#bluerainsystemconfigurationsloaded)
	-	[bluerain.system.components.registered](#bluerainsystemcomponentsregistered)
	-	[bluerain.system.plugins.registered](#bluerainsystempluginsregistered)
	-	[bluerain.system.plugins.initialized](#bluerainsystempluginsinitialized)
	-	[bluerain.system.apps.registered](#bluerainsystemappsregistered)
	-	[bluerain.system.apps.initialized](#bluerainsystemappsinitialized)
	-	[bluerain.system.initialized](#bluerainsysteminitialized)
	-	[bluerain.system.boot.end](#bluerainsystembootend)
- [Redux Store](#redux-store)
	-	[bluerain.redux.initialState](#bluerainreduxinitialstate)
	-	[bluerain.redux.reducers](#bluerainreduxreducers)
	-	[bluerain.redux.reducers.bluerain](#bluerainreduxreducersbluerain)
	-	[bluerain.redux.middlewares](#bluerainreduxmiddlewares)
	-	[bluerain.redux.enhancers](#bluerainreduxenhancers)
	-	[bluerain.redux.composed](#bluerainreduxcomposed)
	-	[bluerain.redux.provider](#bluerainreduxprovider)

## System App

### bluerain.system.app
This hook gives the ability to modify the main System App component.

**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
SystemApp | React.Component | The main system app component.

**Returns:**

Name | Type | Description
------------ | ------------- | -------------
SystemApp | React.Component | The main system app component.

**Example:**

This example wraps the System App with a Redux provider by using a `withRedux` higher order component (HOC).

```javascript
import BR from '@blueeast/bluerain-os';
import withRedux from './withRedux';

BR.Filters(
	'bluerain.system.app', 
	function AddReduxToSystemApp(App) {
		return withRedux(App);
	}
);
```

### bluerain.system.routes
This hook gives the ability to modify system routes JSON schema. This is very useful for adding or modifying pages and routes.

**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
routes | Object | This is the json schema structure of the system routes. This schema is passed to the `parseJsonSchema` method to generate react components after callback execution.

**Returns:**

Name | Type | Description
------------ | ------------- | -------------
routes | Object | This is the json schema structure of the system routes. This schema is passed to the `parseJsonSchema` method to generate react components after callback execution.

## System Lifecycle Events

The following system lifecycle events are listed in the sequence of their execution.


### bluerain.system.boot.start
This Callback is executed at the start of the boot process.

### bluerain.system.configurations.loaded
This Callback is executed after all configurations are loaded.

### bluerain.system.components.registered
This Callback is executed when all system react components are registered.


### bluerain.system.plugins.registered
This Callback is executed when all plugins are registered.

### bluerain.system.plugins.initialized
This Callback is executed when all plugins are initialized.


### bluerain.system.apps.registered
This Callback is executed when all apps are registered.

### bluerain.system.apps.initialized
This Callback is executed when all apps are initialized.

### bluerain.system.initialized
This Callback is executed when initialization process is complete.

### bluerain.system.boot.end
This Callback is executed at the end of the boot process.


## Redux Store
BlueRain provides complete flexibility to modify the main redux store. This is done by providing various hooks at different stages of store initialization.

### bluerain.redux.initialState

This hook gives the ability to modify the initial state sent to the redux store.

**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
initialState | Object | initialState Object

**Returns:**

Name | Type | Description
------------ | ------------- | -------------
initialState | Object | initialState Object

**Example:**

This example sets the `bluerain.taskbar.active` state of the redux store to true at system boot time.

```javascript
import BR from '@blueeast/bluerain-os';

BR.Filters.add(
	'bluerain.redux.initialState',
	function ActivateTaskbar(reducers) {
		return Object.assign({}, reducers, {
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

Name | Type | Description
------------ | ------------- | -------------
reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution.

**Returns:**

Name | Type | Description
------------ | ------------- | -------------
reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution.

**Example:**

This example adds a reducer to bluerain state, which will be accessible at `foo`.

```javascript
import BR from '@blueeast/bluerain-os';
import reducer from './reducer';

BR.Filters(
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

Name | Type | Description
------------ | ------------- | -------------
reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution.

**Returns:**

Name | Type | Description
------------ | ------------- | -------------
reducers | Object | The reducer object. This object will be sent as a param to the `combineReducers` of Redux after callback execution.

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

Name | Type | Description
------------ | ------------- | -------------
middlewares | Array | This is an array of redux middlewares. This array will be sent as a param to the `applyMiddleware ` of Redux after callback execution.


**Returns:**

Name | Type | Description
------------ | ------------- | -------------
middlewares | Array | This is an array of redux middlewares. This array will be sent as a param to the `applyMiddleware ` of Redux after callback execution.


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

Name | Type | Description
------------ | ------------- | -------------
enhancers | Array | This is an array of redux enhancers. This array will be sent as a param to the `compose ` of Redux after callback execution.
middlewares | Array | This is an array of redux middlewares. This array was used to create the enhancer (by passing as a param to `applyMiddleware` function) that was sent inside the array as the first param of this function.


**Returns:**

Name | Type | Description
------------ | ------------- | -------------
enhancers | Array | This is an array of redux enhancers. This array will be sent as a param to the `compose ` of Redux after callback execution.


### bluerain.redux.composed
This hook gives the ability to modify the final composed `enhancers` array (by passing enhancers array as a parameter to the `compose` function), right before they are used in the redux store.
**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
composed | Array | This is the composed enhancers array (by passing `enhancers` array as a parameter to the `compose` function), right before they are used in the redux store.
enhancers | Array | This is an array of redux middlewares. This array was passed as a parameter to the `compose` function. The result was as the first param of this function.


**Returns:**

Name | Type | Description
------------ | ------------- | -------------
composed | Array | This is the composed enhancers array (by passing `enhancers` array as a parameter to the `compose` function), right before they are used in the redux store.


### bluerain.redux.provider
This hook gives the ability to modify the Provider component of the redux store.

**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
Provider | Provider | The react-redux Provider component


**Returns:**

Name | Type | Description
------------ | ------------- | -------------
Provider | Provider | The react-redux Provider component


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