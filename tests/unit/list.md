Need to add the following tests:

### AppRegistry
- [ ] Create app by extending BlueRain's App Component
    - [ ] With appName, app should be created
    - [ ] Without appName, AppRegistry should throw error
    - [ ] With slug, this slug should be used in urls
    - [ ] Without slug, a slug should be auto generated
    - [ ] Create other recognized static properties

- [ ] Create app by extending React Component
    - [ ] With appName, app should be created
    - [ ] Without appName, AppRegistry should throw error
    - [ ] With slug, this slug should be used in urls
    - [ ] Without slug, a slug should be auto generated
    - [ ] Create other recognized static properties

- [ ] Create app by creating a stateless functional react component
    - [ ] With appName, app should be created
    - [ ] Without appName, AppRegistry should throw error
    - [ ] With slug, this slug should be used in urls
    - [ ] Without slug, a slug should be auto generated
    - [ ] Create other recognized static properties

- [ ] Register many apps
    - [ ] Try to register many apps at once
    - [ ] Try to register some erronous apps

- [ ] Remove app
		- [ ] Try to remove a registered app
		- [ ] Try to remove an unregistered app

- [ ] Initialize apps
		- [ ] Does an app initialize?
		- [ ] Does an app inilialize function send app configs as param

- [ ] Get all apps from the registry

- [ ] Get component schema

### PluginRegistry
- [ ] Create plugin by extending BlueRain's Plugin Component
    - [ ] With pluginName, app should be created
    - [ ] Without pluginName, PluginRegistry should throw error
    - [ ] With slug, this slug should be used in urls
    - [ ] Without slug, a slug should be auto generated
    - [ ] Create other recognized static properties

- [ ] Create plugin without extending BlueRain's Plugin component
    - [ ] With pluginName, app should be created
    - [ ] Without pluginName, PluginRegistry should throw error
    - [ ] With slug, this slug should be used in urls
    - [ ] Without slug, a slug should be auto generated
    - [ ] Create other recognized static properties

- [ ] Register many plugins
    - [ ] Try to register many plugins at once
    - [ ] Try to register some erronous plugins

- [ ] Remove plugin
		- [ ] Try to remove a registered plugin
		- [ ] Try to remove an unregistered plugin

- [ ] Initialize plugins
		- [ ] Does a plugin initialize?
		- [ ] Does a plugin inilialize function send plugin configs as param

- [ ] Get a plugin from the registry
		- [ ] Get a registered Plugin
		- [ ] Get a unregistered Plugin

### Boot function
- [ ] Boot with undefined
- [ ] Boot with empty object
- [ ] Boot with expected params and unexpected values
- [ ] Boot with unexpected params
- [ ] Boot with expected params and expected values

### Callback Registry
- [ ] Potential bug identified in `runAsync`: the callback functions are not getting any arguments
