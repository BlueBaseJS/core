import React from 'react';
import BR from '../../';
import Plugin from '../../models/Plugin'; // BR.Plugin doesn't exist yet.

import initialState from './redux/initialState';
import reducer from './redux/reducer';
import getWindowSize from './redux/getWindowSize';
import { withWindowInfo, withWindowSize } from './redux/connect';

import ResponsiveLayout from './components/ResponsiveLayout';
import Container from './components/Container';
import Row from './components/Row';
import Column from './components/Column';

export default class ResponsiveComponentsPlugin extends Plugin {
	static pluginName = 'ResponsiveComponentsPlugin';
	static slug = 'window-info';
	// TODO: Change the slug, breaking change
	// static slug = 'responsive-components';

	static withWindowInfo = withWindowInfo;
	static withWindowSize = withWindowSize;

	static components = {
		ResponsiveLayout,
		Container,
		Row,
		Column
	};

	static hooks = {
		'bluerain.redux.initialState': (state, ctx) => ({
			...state,
			...{
				bluerain: {
					window: initialState()
				}
			}
		}),
		'bluerain.redux.reducers.bluerain': (reducers, ctx) => ({
			...reducers,
			...{
				window: reducer
			}
		}),

		'bluerain.redux.middlewares': (middlewares, ctx) => {
			const middleware = store => next => action => {
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

	static uses = {
		components: [],
		hooks: []
	};

	static getCurrentSize() {
		const state = initialState();
		return state.size;
	}
}

export { withWindowInfo, withWindowSize };
