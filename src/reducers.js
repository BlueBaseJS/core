/* @flow */

import { combineReducers } from 'redux';
import CallbackRegistry from './registries/CallbackRegistry';

const bluerainReducers = CallbackRegistry.run('bluerain.reducers.bluerain', {});

const reducers = CallbackRegistry.run('bluerain.reducers', {
	bluerain: combineReducers(bluerainReducers)
});

export default () => combineReducers(reducers);
