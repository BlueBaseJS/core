/* @flow */

import { getStore, createStore, getInitialState } from './store';
const ReduxPlugin = require('./Plugin').default;
export default ReduxPlugin;
export {
	getStore,
	createStore,
	getInitialState
};
