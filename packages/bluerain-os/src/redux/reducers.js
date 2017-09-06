/* @flow */

import { combineReducers } from 'redux';
import BR from '../index';

export default () => {

	const bluerainReducers = BR.Filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	let reducers = {
		bluerain: combineReducers(bluerainReducers)
	};

	reducers = BR.Filters.run('bluerain.redux.reducers', reducers);
	return combineReducers(reducers);
};
