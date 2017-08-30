/* @flow */

import { combineReducers } from 'redux';
import { BlueRain } from '../index';

export default () => {

	const bluerainReducers = BlueRain.filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	let reducers = {
		bluerain: combineReducers(bluerainReducers)
	};

	reducers = BlueRain.filters.run('bluerain.redux.reducers', reducers);
	return combineReducers(reducers);
};
