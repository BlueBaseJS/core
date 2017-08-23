# Hooks

These are the known callback hooks in the system:

- [System App]()
	-	[bluerain.system.app]()
	-	[bluerain.routes]()
- [System Lifecycle Events]()
	-	[bluerain.postinit.start.sync]()
	-	[bluerain.postinit.end.sync]()
	-	[bluerain.preboot.start.sync]()
	-	[bluerain.preboot.end.sync]()
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

### bluerain.postinit.start
### bluerain.postinit.end
### bluerain.preboot.start
### bluerain.preboot.end


## Redux Store
BlueRain provides complete flexibility to modify the main redux store. This is done by providing various hooks at different stages of store initialization.

### bluerain.redux.initialState

This hook gives the ability to modify the initial state sent to the redux store.

**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
initialState | Object | initialState Object

**Returns:**

Type | Description
------------- | -------------
Object | initialState Object

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
### bluerain.redux.composed
### bluerain.redux.provider
