import { Plugin } from '@blueeast/bluerain-os';
import { compose } from 'redux';

function addReduxDevTools(composed, enhancers) {
	composed = compose(composed, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line no-undef
	return composed;
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
