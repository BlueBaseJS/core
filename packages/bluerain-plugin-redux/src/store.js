/* @flow */

import {
	createStore as createReduxStore,
	applyMiddleware,
	compose
} from 'redux';
import { type BlueRainType } from '@blueeast/bluerain-os';
import getReducers from './reducers';

let initialState = {
	bluerain: {}
};

let store;

const createStore = (ctx: BlueRainType) => {

	initialState = ctx.Filters.run('bluerain.redux.initialState', initialState);

	const reducers = getReducers(ctx);

	let middlewares = [];
	middlewares = ctx.Filters.run('bluerain.redux.middlewares', middlewares);

	let enhancers = [applyMiddleware(...middlewares)];
	enhancers = ctx.Filters.run('bluerain.redux.enhancers', enhancers, ...middlewares);

	let composed = compose(...enhancers);
	composed = ctx.Filters.run('bluerain.redux.composed', composed, ...enhancers);

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
