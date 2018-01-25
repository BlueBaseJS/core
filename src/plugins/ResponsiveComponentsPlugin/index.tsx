import React from 'react';
import { BlueRainType, Plugin } from '../../';

import initialState from './redux/initialState';
import reducer from './redux/reducer';
import getWindowSize from './helpers/getWindowSize';
import { withWindowInfo, withWindowSize } from './redux/connect';

import ResponsiveLayout from './components/ResponsiveLayout';
import Container from './components/Container';
import Row from './components/Row';
import Column from './components/Column';

export default class ResponsiveComponentsPlugin extends Plugin {
	static pluginName = 'ResponsiveComponentsPlugin';
	static slug = 'responsive-components';

	static withWindowInfo = withWindowInfo;
	static withWindowSize = withWindowSize;

	static components = {
		ResponsiveLayout,
		Container,
		Row,
		Column
	};

	static hooks = {

		// Create state in redux store's bluerain property
		'bluerain.redux.reducers.bluerain': (reducers, ctx: BlueRainType) => ({
			...reducers,
			...{
				window: reducer
			}
		}),

		// Inject redux initial state
		'bluerain.redux.initialState': (state, ctx: BlueRainType) => ({
			...state,
			...{
				bluerain: {
					window: initialState()
				}
			}
		}),

		'bluerain.redux.middlewares': (middlewares, ctx: BlueRainType) => {
			const middleware = store => next => action => {
				if (action.type !== '@@BLUERAIN/SET_WINDOW_INFO') {
					return next(action);
				}

				const state = store.getState();
				const prevSize = state.bluerain.window.size;
				const newSize = getWindowSize(action.width);

				if (prevSize !== newSize) {
					ctx.Events.emit('plugin.window_info.resize', newSize, prevSize);
				}

				next(action);
			};
			middlewares.push(middleware);
			return middlewares;
		},

		// Wrap SystemLayout to subscribe to screen size changes.
		'bluerain.system.plugins.initialized': (ctx) => {

			const WithLayout = (Component) => {
				const LayoutComponent = (props) => {
					const onLayout = () => {
						const newDimentions = ctx.Dimensions();
						const oldDimentions = props.window;

						if (newDimentions.width !== oldDimentions.width || newDimentions.height !== oldDimentions.height) {
							props.setWindowDimentions(newDimentions.width? newDimentions.width: oldDimentions.width,
								newDimentions.height ? newDimentions.height: oldDimentions.height);
						}
					};

					return <Component Layout={onLayout} {...props}  />;
				};

				return withWindowInfo(LayoutComponent);
			};

			ctx.Components.addHocs('SystemLayout', WithLayout);
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
