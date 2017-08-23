# Hooks

These are the known callback hooks in the system:

- [System App]()
	-	[bluerain.system.app]()
	-	[bluerain.routes]()
- [System Lifecycle Events]()
	-	[bluerain.system.boot.start]()
	-	[bluerain.system.configurations.loaded]()
	-	[bluerain.system.components.registered]()
	-	[bluerain.system.plugins.registered]()
	-	[bluerain.system.plugins.initialized]()
	-	[bluerain.system.apps.registered]()
	-	[bluerain.system.apps.initialized]()
	-	[bluerain.system.initialized]()
	-	[bluerain.system.boot.end]()
- [Redux Store](#reduxstore)
	-	[bluerain.redux.initialState](#bluerainreduxinitialState)
	-	[bluerain.redux.reducers]()
	-	[bluerain.redux.reducers.bluerain]()
	-	[bluerain.redux.middlewares]()
	-	[bluerain.redux.enhancers]()
	-	[bluerain.redux.composed]()
	-	[bluerain.redux.provider]()

## System App
### bluerain.system.app
### bluerain.routes

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
import { CallbackRegistry } from 'bluerain-os';

CallbackRegistry.add('bluerain.redux.initialState', (initialState) => {
	return Object.assign({}, reducers, {
		bluerain: {
			taskbar: {
				active: true
			}
		}
	})
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
import { CallbackRegistry } from 'bluerain-os';
import reducer from './reducer';

CallbackRegistry.add('bluerain.redux.reducers', (reducers) => {
	return Object.assign({}, reducers, {
		foo: 'bar'
	})
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
import { CallbackRegistry } from 'bluerain-os';
import reducer from './reducer';

CallbackRegistry.add('bluerain.redux.reducers.bluerain', (reducers) => {
	return Object.assign({}, reducers, {
		taskbar: reducer
	})
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
import { CallbackRegistry } from 'bluerain-os';
import customMiddleware from './customMiddleware';

CallbackRegistry.add('bluerain.redux.middlewares', (middlewares) => {
	return middlewares.push(customMiddleware());
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
import { CallbackRegistry } from 'bluerain-os';
import { ApolloProvider } from 'react-apollo';

CallbackRegistry.add('bluerain.redux.provider', (Provider) {
	return ({ store, children }) => (<ApolloProvider store={store} client={client}>{children}</ApolloProvider>);
}

```