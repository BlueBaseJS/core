/* @flow */

import {
	createStore as createReduxStore,
	applyMiddleware,
	compose
} from 'redux';

import BR from '../index';

import getReducers from './reducers';

let initialState = {
	bluerain: {}
};

let store;

const createStore = () => {

	initialState = BR.Filters.run('bluerain.redux.initialState', initialState);

	const reducers = getReducers();

	let middlewares = [];
	middlewares = BR.Filters.run('bluerain.redux.middlewares', middlewares);

	let enhancers = [applyMiddleware(...middlewares)];
	enhancers = BR.Filters.run('bluerain.redux.enhancers', enhancers, ...middlewares);

	let composed = compose(...enhancers);
	composed = BR.Filters.run('bluerain.redux.composed', composed, ...enhancers);

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
