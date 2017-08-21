import { compose } from 'redux';
import  { Plugin, CallbackRegistry } from '../../../../src/';

function addReduxDevTools(composed, enhancers) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	return composeEnhancers(enhancers);
}

class ReduxDevtoolsPlugin extends Plugin {

	static pluginName = 'ReduxDevtoolsPlugin';
	static slug = 'redux-devtools';

	static initialize() {
		CallbackRegistry.add('bluerain.redux.composed', addReduxDevTools);
	}
}

export default ReduxDevtoolsPlugin;
