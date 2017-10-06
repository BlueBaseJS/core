/* @flow */

// import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import Taskbar from './common/Taskbar';

import setResponsiveConfigs from './redux/setResponsiveConfigs';
import reducer from './redux/reducer';
import withSystemNav from './redux/withSystemNav';

import NavAppItem from './common/Buttons/NavAppItem';
import NavDividerItem from './common/Buttons/NavDividerItem';
import NavSpacerItem from './common/Buttons/NavSpacerItem';

/**
 * Main Taskbar Plugin class.
 * @property {string} pluginName "TaskbarPlugin"
 * @property {string} slug "taskbar"
 */
class TaskbarPlugin extends Plugin {
	static pluginName = 'TaskbarPlugin';

	static slug = 'taskbar';

	static initialize(config = {}, ctx) {

		// Components
		ctx.Components.register('NavAppItem', NavAppItem);
		ctx.Components.register('NavDividerItem', NavDividerItem);
		ctx.Components.register('NavSpacerItem', NavSpacerItem);

		// Add taskbar
		ctx.Filters.add('bluerain.system.app.layout', function taskbar(schema) {
			schema.children.unshift({ component: withSystemNav(Taskbar) });
			return schema;
		});

		ctx.Filters.add('bluerain.redux.reducers.bluerain', function AddSystemNavReducers(reducers) {
			return Object.assign({}, reducers, {
				systemNav: reducer
			});
		});

    // Add translations
		ctx.Filters.add('bluerain.intl.messages', function eng(messages) {
			const en = require('./lang/en.json');
			const ur = require('./lang/ur.json');

			messages.en =  Object.assign(messages.en ? messages.en : {}, en);
			messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);

			return messages;
		});

		// When window is resized
		//	- on boot
		ctx.Filters.add('bluerain.system.boot.end', function eng(messages) {
			const state = ctx.refs.store.getState();
			const size = state.bluerain.window.size;
			const open = state.bluerain.systemNav.open;
			setResponsiveConfigs(ctx.refs.store.dispatch, size, open);
		});

		// 	- every time window is resized
		ctx.Events.on('plugin.window_info.resize', (size, prevSize) => {
			setResponsiveConfigs(ctx.refs.store.dispatch, size);
		});
	}
}
TaskbarPlugin.withSystemNav = withSystemNav;
export { withSystemNav };
export default TaskbarPlugin;
