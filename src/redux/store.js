/* @flow */

import {
	createStore as createReduxStore,
	applyMiddleware,
	compose
} from 'redux';

import { CallbackRegistry } from '../index';

import getReducers from './reducers';

let initialState = {};
let store;

const createStore = () => {

	initialState = CallbackRegistry.run('bluerain.redux.initialState', initialState);

	let reducers = getReducers();
	reducers = CallbackRegistry.run('bluerain.redux.reducers', reducers);

	let middlewares = [];
	middlewares = CallbackRegistry.run('bluerain.redux.middlewares', initialState);

	let enhancers = [applyMiddleware(...middlewares)];
	enhancers = CallbackRegistry.run('bluerain.redux.enhancers', enhancers);

	let composed = compose(...enhancers);
	composed = CallbackRegistry.run('bluerain.redux.composed', composed);

	store = createReduxStore(reducers, initialState,  composed);

	return store;
};

const getStore = () => store;
const getInitialState = () => initialState;

export {
	getStore,
	createStore,
	getInitialState
};
