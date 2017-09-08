/* @flow */

import { combineReducers } from 'redux';

export default (ctx) => {

	const bluerainReducers = ctx.Filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	let reducers = {
		bluerain: combineReducers(bluerainReducers)
	};

	reducers = ctx.Filters.run('bluerain.redux.reducers', reducers);
	return combineReducers(reducers);
};
