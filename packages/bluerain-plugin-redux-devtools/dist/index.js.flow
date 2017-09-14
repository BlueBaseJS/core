import BR from '@blueeast/bluerain-os';
import { compose } from 'redux';

function addReduxDevTools(composed, enhancers) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-undef
	return composeEnhancers(enhancers);
}

class ReduxDevtoolsPlugin extends BR.Plugin {

	static pluginName = 'ReduxDevtoolsPlugin';
	static slug = 'redux-devtools';

	static initialize(config, ctx) {
		ctx.Filters.add('bluerain.redux.composed', addReduxDevTools);
	}
}

export default ReduxDevtoolsPlugin;
