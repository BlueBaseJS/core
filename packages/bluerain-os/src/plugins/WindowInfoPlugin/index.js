import BR from '../../';
import Plugin from '../../models/Plugin'; // BR.Plugin doesn't exist yet.

import reducer from './reducer';
import { withWindowInfo, withWindowSize } from './connect';

export default class WindowInfoPlugin extends Plugin {

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
	static withWindowSize = withWindowSize;
}

export {
	withWindowInfo, withWindowSize
};
