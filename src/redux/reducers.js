/* @flow */

import { combineReducers } from 'redux';
import { CallbackRegistry } from '../index';

export default () => {

	const bluerainReducers = CallbackRegistry.run('bluerain.redux.reducers.bluerain', {
		stub: (state = {}) => state
	});

	let reducers = {
		bluerain: combineReducers(bluerainReducers)
	};

	reducers = CallbackRegistry.run('bluerain.redux.reducers', reducers);
	return combineReducers(reducers);
};
