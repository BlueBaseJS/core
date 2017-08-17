import { combineReducers } from 'redux';
import { runCallbacks } from '../client-services/Callbacks/Callbacks';

const bluerainReducers = runCallbacks('bluerain.reducers.bluerain', {});

const reducers = runCallbacks('bluerain.reducers', {
	bluerain: combineReducers(bluerainReducers)
});

export default () => combineReducers(reducers);
