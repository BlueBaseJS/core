---
title: Callbacks
description: Bluerain OS  uses a system of hooks and callbacks for many of its operations.
---




<h2 id="adding-callback">Adding Callback Functions</h2>

For example, here’s how you would add a callback to bluerain.routes to add routes:

```js
import { addCallback } from 'bluerain-client-services/lib/Callbacks';

function addRoute (routes) {
  //add new routes

  return routes;
}
addCallback('bluerain.routes', addRoute);
```
> Note: The callback function should not be anonymous function and hook should be a valid string.

## Running Callback Hooks

Callbacks are run using the `runCallbacks`  function:

```js
import { runCallbacks } from 'bluerain-client-services/lib/Callbacks';

runCallbacks(`bluerain.routes`, routes)
```
> Note: runCallbacks function run the array of functions added against the specified hook.

In each case, the **first** argument is the name of the callback hook, the **second** argument is the one iterated on by each callback function on the hook, while any remaining arguments are just passed along from one iteration to the next.
Running callbacks run all callbacks against the hook, return of first function is passed to second function as argument and so on.


## Removing Callback Functions

If the callback function is named (i.e. declared using the `function foo () {}` syntax), you can also remove it from the callback using:

```js
import { removeCallback } from 'bluerain-client-services/lib/Callbacks';

removeCallback("bluerain.routes", "addRoute");

```

 
