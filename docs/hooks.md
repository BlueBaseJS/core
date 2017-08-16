# Hooks

These are the known callback hooks in the system:

## Customising Redux store

### bluerain.reducers

Use this hook to add a reducer to the main Redux store.

**Arguments:**
* reducers object


### bluerain.reducers.bluerain

Use this hook to add a reducer to the `bluerain` property of the main Redux store.

**Arguments:**
* reducers object

**Example:**

```js
import { addCallback } from 'bluerain-os/Callbacks';
import reducer from './reducer';

addCallback('bluerain.reducers.bluerain', (reducers) => {
	return Object.assign({}, reducers, {
		taskbar: reducer
	})
);

```