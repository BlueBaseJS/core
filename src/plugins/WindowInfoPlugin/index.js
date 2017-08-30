import BR from '../../index';

import reducer from './reducer';
import withWindowInfo from './connect';

export default class WindowInfoPlugin extends BR.Plugin {

	static pluginName = 'WindowInfoPlugin';
	static slug = 'window-info';

	static initialize() {
		BR.Filters.add('bluerain.redux.reducers.bluerain', function AddReducers(reducers) {
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
