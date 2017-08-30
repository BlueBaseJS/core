
import CallbackRegistry from '../../registries/FilterRegistry';
import Plugin from '../../models/Plugin';

import reducer from './reducer';
import withWindowInfo from './connect';

export default class WindowInfoPlugin extends Plugin {

	static pluginName = 'WindowInfoPlugin';
	static slug = 'window-info';

	static initialize() {
		CallbackRegistry.add('bluerain.redux.reducers.bluerain', function AddReducers(reducers) {
			return Object.assign({}, reducers, {
				window: reducer
			});
		});
	}

	static withWindowInfo = withWindowInfo;
}

export {
	withWindowInfo
};
