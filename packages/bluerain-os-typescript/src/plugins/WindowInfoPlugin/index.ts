import BR from '../../';
import Plugin from '../../models/Plugin'; // BR.Plugin doesn't exist yet.

import initialState from './initialState';
import reducer from './reducer';
import getWindowSize from './getWindowSize';
import { withWindowInfo, withWindowSize } from './connect';

export default class WindowInfoPlugin extends Plugin {
	static pluginName = 'WindowInfoPlugin';
	static slug = 'window-info';
	static withWindowInfo = withWindowInfo;
	static withWindowSize = withWindowSize;

	static initialize() {
		BR.Filters.add(
			'bluerain.redux.initialState', 'AddWindowInfoInitialState' , state => {
				return {...state,
					bluerain: {
						window: initialState()
					}};
			}
		);

		BR.Filters.add('bluerain.redux.reducers.bluerain', 'AddReducers', reducers => {
			return {...reducers,
				window: reducer};
		});

		// Middleware
		const middleware = store => next => action => {
			if (action.type !== '@@BLUERAIN/SET_WINDOW_INFO') {
				return next(action);
			}

			const state = store.getState();
			const prevSize = state.bluerain.window.size;
			const newSize = getWindowSize(action.width);

			if (prevSize !== newSize) {
				BR.Events.data.emit('plugin.window_info.resize', newSize, prevSize);
			}

			next(action);
		};

		BR.Filters.add('bluerain.redux.middlewares','AddMiddleware', middlewares => {
			middlewares.push(middleware);
			return middlewares;
		});
	}

	static getCurrentSize() {
		const state = initialState();
		return state.size;
	}
}

export { withWindowInfo, withWindowSize };
