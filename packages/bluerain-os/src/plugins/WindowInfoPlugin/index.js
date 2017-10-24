import BR from '../../';
import Plugin from '../../models/Plugin'; // BR.Plugin doesn't exist yet.

import initialState from './initialState';
import reducer from './reducer';
import getWindowSize from './getWindowSize';
import { withWindowInfo, withWindowSize } from './connect';

export default class WindowInfoPlugin extends Plugin {

	static pluginName = 'WindowInfoPlugin';
	static slug = 'window-info';

	static initialize() {

		BR.Filters.add('bluerain.redux.initialState', function AddWindowInfoInitialState(state) {
			return Object.assign({}, state, {
				bluerain: {
					window: initialState()
				}
			});
		});


		BR.Filters.add('bluerain.redux.reducers.bluerain', function AddReducers(reducers) {
			return Object.assign({}, reducers, {
				window: reducer
			});
		});

		// Middleware
		const middleware = store => next => (action) => {

			if (action.type !== '@@BLUERAIN/SET_WINDOW_INFO') {
				return next(action);
			}

			const state = store.getState();
			const prevSize = state.bluerain.window.size;
			const newSize = getWindowSize(action.width);

			if (prevSize !== newSize) {
				BR.Events.emit('plugin.window_info.resize', newSize, prevSize);
			}

			next(action);
		};

		BR.Filters.add('bluerain.redux.middlewares', function AddMiddleware(middlewares) {
			middlewares.push(middleware);
			return middlewares;
		});
	}

	static withWindowInfo = withWindowInfo;
	static withWindowSize = withWindowSize;

	static getCurrentSize() {
		const state = initialState();
		return state.size;
	}
}

export {
	withWindowInfo, withWindowSize
};
