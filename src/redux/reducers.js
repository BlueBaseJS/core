/* @flow */

import { combineReducers } from 'redux';
import { CallbackRegistry } from '../index';

export default () => {

	const bluerainReducers = CallbackRegistry.run('bluerain.redux.reducers.bluerain', {
		stub: state => state || {}
	});

	const reducers = {
		bluerain: combineReducers(bluerainReducers)
	};

	return combineReducers(reducers);
};
