import { Plugin } from '@blueeast/bluerain-os';
import { compose } from 'redux';

function addReduxDevTools(composed, enhancers) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-undef
	return composeEnhancers(enhancers);
}

/**
 * Adds compatibility to [Redux Devtools Extension](https://github.com/gaearon/redux-devtools) to make it easy to debug redux in BlueRain OS.
 *
 * @property {string} pluginName "ReduxDevtoolsPlugin"
 * @property {string} slug "redux-devtools"
 */
class ReduxDevtoolsPlugin extends Plugin {

	static pluginName = 'ReduxDevtoolsPlugin';
	static slug = 'redux-devtools';

	static initialize(config, ctx) {
		ctx.Filters.add('bluerain.redux.composed', addReduxDevTools);
	}
}

export default ReduxDevtoolsPlugin;
