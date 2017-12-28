import React from 'react';
import BR from '../../';
import Plugin from '../../models/Plugin'; // BR.Plugin doesn't exist yet.

import initialState from './initialState';
import reducer from './reducer';
import getWindowSize from './getWindowSize';
import { withWindowInfo, withWindowSize } from './connect';

export default class WindowInfoPlugin extends Plugin {
	static pluginName = 'WindowInfoPlugin';
	static slug = 'window-info';
	static hooks = {
		'bluerain.redux.initialState':(state, ctx) => Object.assign({}, state, {
			bluerain: {
				window: initialState()
			}
		}),
		'bluerain.redux.reducers.bluerain':(reducers, ctx) => Object.assign({}, reducers, {
			window: reducer
		}),
		'bluerain.redux.middlewares':(middlewares, ctx) => {
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
			middlewares.push(middleware);
			return middlewares;
		}
	};
	static uses= {
		components: [],
		hooks: [],
	};
	static initialize() {

	}

	static getCurrentSize() {
		const state = initialState();
		return state.size;
	}
}

export { withWindowInfo, withWindowSize };
