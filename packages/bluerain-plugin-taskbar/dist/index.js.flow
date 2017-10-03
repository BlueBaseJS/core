/* @flow */

// import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import Taskbar from './pages/taskbar';
import reducer from './systemnav/reducer';
import withSystemNav from './systemnav/withSystemNav';
/**
 * Main Taskbar Plugin class.
 * @property {string} pluginName "TaskbarPlugin"
 * @property {string} slug "taskbar"
 */
class TaskbarPlugin extends Plugin {
	static pluginName = 'TaskbarPlugin';

	static slug = 'taskbar';

	static initialize(config = {}, ctx) {

		// add withSystemNav HOC to SystemLayout
		ctx.Filters.add('bluerain.systemlayout', function addSystemNav() {
			ctx.Components.addHOCs('SystemLayout', withSystemNav);
		});

		// Add taskbar
		ctx.Filters.add('bluerain.system.app.layout', function taskbar(schema, disabled) {
			ctx.Components.addHOCs('SystemLayout', withSystemNav);
			if (!disabled) {
				schema.children.unshift({ component: Taskbar });
			}
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
	}
}
TaskbarPlugin.withSystemNav = withSystemNav;
export { withSystemNav };
export default TaskbarPlugin;
