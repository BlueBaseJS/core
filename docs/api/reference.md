<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Platform](#platform)
    -   [getType](#gettype)
    -   [setServerMode](#setservermode)
-   [filtersObj](#filtersobj)
-   [BootOptions](#bootoptions)
-   [boot](#boot)
-   [Config](#config)
-   [ResponsiveLayout](#responsivelayout)
-   [onLayout](#onlayout)
-   [App](#app)
-   [Plugin](#plugin)
-   [IndexPage](#indexpage)
-   [NotFoundPage](#notfoundpage)
-   [WindowState](#windowstate)
-   [AppRegistry](#appregistry)
    -   [register](#register)
    -   [set](#set)
    -   [registerMany](#registermany)
    -   [initializeAll](#initializeall)
    -   [getComponentSchema](#getcomponentschema)
    -   [getAllRoutes](#getallroutes)
-   [ComponentRegistry](#componentregistry)
    -   [register](#register-1)
    -   [set](#set-1)
    -   [addHocs](#addhocs)
    -   [get](#get)
    -   [getRawComponent](#getrawcomponent)
    -   [replace](#replace)
-   [ConfigRegistry](#configregistry)
    -   [set](#set-2)
    -   [get](#get-1)
    -   [register](#register-2)
    -   [registerMany](#registermany-1)
-   [EventEmitter](#eventemitter)
-   [FilterRegistry](#filterregistry)
    -   [add](#add)
    -   [set](#set-3)
    -   [remove](#remove)
    -   [run](#run)
-   [HookRegistry](#hookregistry)
    -   [add](#add-1)
    -   [run](#run-1)
-   [Registry](#registry)
    -   [set](#set-4)
    -   [replace](#replace-1)
    -   [get](#get-2)
    -   [has](#has)
    -   [remove](#remove-1)
-   [PluginRegistry](#pluginregistry)
    -   [register](#register-3)
    -   [set](#set-5)
    -   [registerMany](#registermany-2)
    -   [initializeAll](#initializeall-1)

## Platform

This interface provides information about the OS or runtime platform on which the app is running.

### getType

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** PlatformType ('web' | 'server' | 'ios' | 'android' | 'windows' | 'electron')

### setServerMode

Set the Platform to 'server'.
Useful to see if the app is rendering on server due to SSR.

**Parameters**

-   `mode` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**  (optional, default `false`)

## filtersObj

This is the main BlueRain context. Works as a backbone of whole system.

**Properties**

-   `Apps` **[AppRegistry](#appregistry)** Instance object of AppRegistry.
-   `Components` **[ComponentRegistry](#componentregistry)** Instance object of ComponentRegistry.
-   `Configs` **[ConfigRegistry](#configregistry)** Instance object of ConfigRegistry.
-   `Events` **EventRegistry** Instance object of EventRegistry.
-   `Filters` **[FilterRegistry](#filterregistry)** Instance object of FilterRegistry.
-   `Plugins` **[PluginRegistry](#pluginregistry)** Instance object of PluginRegistry.
-   `Utils` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Contains utility methods.
    -   `Utils.parseJsonSchema` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Converts JSON schema to React Component tree
-   `refs` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Contains references of objects created by different apps and plugins
-   `boot` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Function to boot the OS.

## BootOptions

Options object that `boot` and `bootOnServer` methods expect.

Type: {apps: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BR.App>?, config: ConfigType?, renderApp: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?, plugins: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BR.Plugin>?, serverMode: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?}

**Properties**

-   `apps` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BR.App>** An array of apps to load
-   `config` **ConfigType** Configuration object
-   `renderApp` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If set to false, BlueRain will not render the main app, instead it is up to the developer to render it. The App is returned from the boot function.
-   `plugins` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BR.Plugin>** An array of plugins to load
-   `serverMode` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set this flag to true when rendering during Server Side Rendering
-   `apps` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BR.App>?** 
-   `config` **ConfigType?** 
-   `renderApp` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** 
-   `plugins` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;BR.Plugin>?** 
-   `serverMode` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** 

## boot

Boots the OS and renders the main UI. Use it on the client side

**Parameters**

-   `options` **[BootOptions](#bootoptions)**  (optional, default `{serverMode:false,renderApp:true}`)

Returns **ComponentType&lt;any>** 

## Config

This is the default configuration set
that is used at boot time.

Type: ConfigType

**Properties**

-   `apps` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Configurations for apps
-   `appRoutePrefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** [default: "/app"]	This route will be prependded to all app routes
-   `debug` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** [default: true, false if NODE_ENV="production"]							Debug mode
-   `development` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** [default: true, false if NODE_ENV="production"]				Development mode
-   `locale` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** [default: "en"]						App locale
-   `plugins` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Configurations for plugins
-   `title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** [default: "BlueRain OS"]		Main title of the app
-   `theme` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Theme to customize styling

## ResponsiveLayout

ResponsiveLayout component to create responsive layouts.

**Parameters**

-   `props` **ResponsiveLayoutProps** 

**Properties**

-   `windowSize` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The window size i.e. (xs|sm|md|lg|xl)
-   `default` **React.Component** The default component to render, if a current size component is not given.
-   `xs` **React.Component** The component to render when the screen size is extra-small.
-   `sm` **React.Component** The component to render when the screen size is small.
-   `md` **React.Component** The component to render when the screen size is medium.
-   `lg` **React.Component** The component to render when the screen size is large.
-   `xl` **React.Component** The component to render when the screen size is extra-large.

## onLayout

Whenever the screen/window size changes, notify redux to
update `state.bluerain.window` object.

## App

**Extends RX.Component**

A BlueRain App base class

**Properties**

-   `appName` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the app
-   `slug` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** App's slug, used in to build URL
-   `category` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Category the App belongs to
-   `description` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** App description
-   `version` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** App version
-   `appRoutePrefix` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Path that will be prepended before slug to build URL.
-   `path` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of the app's home page

## Plugin

Base class of a plugin which is to be extended.

**Properties**

-   `pluginName` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the app
-   `slug` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** App's slug, used in to build URL
-   `config` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Plugin configurations
-   `category` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Category the App belongs to
-   `description` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** App description
-   `version` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** App version

## IndexPage

Returns the Index Page layout.

Returns **React.Component** The layout react component

## NotFoundPage

Returns the 404 Page layout.

Returns **React.Component** The layout react component

## WindowState

The state of current window or screen. Stored in `bluerain.window` in the redux store.

Type: {width: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), height: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), size: (`"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"`)}

**Properties**

-   `width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The window width
-   `height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The window height
-   `size` **(`"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"`)** The window size i.e. (xs|sm|md|lg|xl)
-   `width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `size` **(`"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"`)** 

## AppRegistry

**Extends MapRegistry**

All system apps are stored in this registry

**Properties**

-   `data` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [App](#app)>** Map(immutablejs) of all apps

### register

Register an App To be deprecated in 2.0.0

**Parameters**

-   `app` **[App](#app)** The BlueRain app to register

### set

Register an App

**Parameters**

-   `app` **[App](#app)** The BlueRain app to register

### registerMany

Register many apps at once

**Parameters**

-   `apps` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[App](#app)>** The BlueRain apps to register

### initializeAll

Initialize all the registered apps

### getComponentSchema

Returns the JSON schema of the main APPs component.
This component renders all the routes of apps.To be deprecated in 2.0.0

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** JSON Schema

### getAllRoutes

Returns the JSON schema of the main APPs component.
This component renders all the routes of apps.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** JSON Schema

## ComponentRegistry

**Extends MapRegistry**

All system components are stored in this registry

**Properties**

-   `data` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), {rawComponent: ReactElement&lt;any>, hocs: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)>}>** Storage of all components

### register

Register a component with a name, a raw component than can be extended
and one or more optional higher order components.To be deprecated in 2.0.0

**Parameters**

-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the component to register.
-   `rawComponent` **ReactElement&lt;any>** Interchangeable/extendable component.
-   `hocs` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;ComponentRegistryHocItem>** The HOCs to compose with the raw component.

### set

Register a component with a name, a raw component than can be extended
and one or more optional higher order components.

**Parameters**

-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the component to register.
-   `rawComponent` **ReactElement&lt;any>** Interchangeable/extendable component.
-   `hocs` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;ComponentRegistryHocItem>** The HOCs to compose with the raw component.Note: when a component is registered without higher order component, `hocs` will be
    an empty array, and it's ok!
    See <https://lodash.com/docs/4.17.4#flowRight>

### addHocs

Adds higher order component to the registered component

**Parameters**

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the registered component to whom hocs are to added
-   `hocs` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;ComponentRegistryHocItem>** The HOCs to compose with the raw component.

### get

Get a component registered with set(name, component, ...hocs).
Its accepts multiple component names.It iterates arguments and returns first found registered component.

**Parameters**

-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the component to get.

Returns **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | ReactElement&lt;any>)** A (wrapped) React component

### getRawComponent

Get the **raw** (original) component registered with registerComponent
without the possible HOCs wrapping it.

**Parameters**

-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the component to get.

Returns **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | ReactElement&lt;any>)** An interchangeable/extendable React component

### replace

Replace a component with the same name with a new component or
an extension of the raw component and one or more optional higher order components.
This function keeps track of the previous HOCs and wrap the new HOCs around previous ones

**Parameters**

-   `name` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the component to register.
-   `newComponent` **ReactElement&lt;any>** 
-   `newHocs` **...[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)>** 
-   `rawComponent` **ReactElement&lt;any>** Interchangeable/extendable component.
-   `hocs` **...[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The HOCs to compose with the raw component.

Returns **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | ReactElement&lt;any>)** A component callable with Components[name]Note: when a component is registered without higher order component, `hocs` will be
an empty array, and it's ok!
See <https://lodash.com/docs/4.17.4#flowRight>

## ConfigRegistry

All system configs are stored in this registry

**Properties**

-   `ConfigsTable` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Storage table of all configs

### set

Set a Config

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `value` **any** 

### get

Get a config value

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **any** 

### register

Register a Config To be deprecated in 2.0.0

**Parameters**

-   `configs` **{}** 

### registerMany

Register many configs at once

**Parameters**

-   `configs` **{}** 

## EventEmitter

All system events are stored in this registry.It is using [event emitter](https://github.com/primus/eventemitter3) to emit and add events.

## FilterRegistry

**Extends MapRegistry**

All system filters are stored in this registry

**Properties**

-   `data` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), List&lt;{name: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), filter: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)}>>** Storage of all filters and their respective functions

### add

Add a filter function to a hook.To be deprecated in 2.0.0

**Parameters**

-   `hook` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the hook
-   `name` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** The name of filter function
-   `filter` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The filter function
-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index where function should be placed in array of functions against the hook

### set

Add a filter function to a hook.

**Parameters**

-   `hook` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the hook
-   `name` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** The name of filter function
-   `filter` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The filter function
-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index where function should be placed in array of functions against the hook

### remove

Remove a filter from a hook

**Parameters**

-   `hook` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `hookName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the hook
-   `filterName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the function to remove

### run

Successively run all of a hook's filters on an item

**Parameters**

-   `hook` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** First argument: the name of the hook
-   `item` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Second argument: the post, comment, modifier, etc.
     on which to run the filters
-   `args` **Any** Other arguments will be passed to each successive iteration

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Returns the item after it's been through all the filters for this hook

## HookRegistry

All system hooks are stored in this registry

**Parameters**

-   `filters`  
-   `events`  

### add

Add a filter function to a hook.

**Parameters**

-   `hook` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the hook
-   `name` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** 
-   `filter` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The filter function

### run

Successively run all of a hook's functions on an item

**Parameters**

-   `hook` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** First argument: the name of the hook
-   `mode` **(`"async"` \| `"sync"` \| `"both"`)** Second argument: mode in which hook will run. If not given mode will be sync (optional, default `'sync'`)
-   `args` **Any** Other arguments will be passed to each successive iteration

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Returns the item after it's been through all the filters for this hook

## Registry

A generic Registry class in the BlueRain OS. Used to store data.

**Parameters**

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### set

Add an item to the Registry.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key of the item
-   `item` **any** The item to add
-   `rest` **...[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** 

### replace

Replace an item in the Registry.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key of the item
-   `item` **any** The item to add

### get

Get an item from the Registry by its key.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key of the item

Returns **any** 

### has

Check if an item is registered.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the item to check

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### remove

Remove a plugin from the registry

**Parameters**

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The key plugin to remove
-   `rest` **...[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** 

## PluginRegistry

**Extends MapRegistry**

All system plugins are stored in this registry

**Properties**

-   `data` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Plugin](#plugin)>** Storage Map of all plugins

### register

Register a Plugin To be deprecated in 2.0.0

**Parameters**

-   `plugin` **[Plugin](#plugin)** The plugin to register

### set

Register a Plugin

**Parameters**

-   `plugin` **[Plugin](#plugin)** The plugin to register

### registerMany

Register many plugins at once

**Parameters**

-   `plugins` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Plugin](#plugin)>** The array of plugins to register

### initializeAll

Initialize all the registered plugins