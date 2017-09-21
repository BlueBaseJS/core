# Hooks

These are the known callback hooks in the system:

- [System App](#system-app)
	-	[bluerain.system.app](#bluerainsystemapp)
	-	[bluerain.system.app.schema](#bluerainsystemappschema)
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

## System App

### bluerain.system.app
This hook gives the ability to modify the main System App component. This can be used to do things like wrapping the SystemApp in a HOC.

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

### bluerain.system.app.schema
If you would rather modify the structure of the SystemApp itself, you can hook into it's JSON schema right before it is converted into a React Component at runtime.

**Parameters:**

Name | Type | Description
------------ | ------------- | -------------
schema | Object | This is the json schema structure of the system app. This schema is passed to the `parseJsonSchema` method to generate react components after callback execution.

**Returns:**

Name | Type | Description
------------ | ------------- | -------------
schema | Object | This is the json schema structure of the system app. This schema is passed to the `parseJsonSchema` method to generate react components after callback execution.


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
