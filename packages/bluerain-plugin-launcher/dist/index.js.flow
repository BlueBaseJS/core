/* @flow */

// import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import Launcher from './pages/launcher';

/**
 * Main Launcher Plugin class.
 * @property {string} pluginName "LauncherPlugin"
 * @property {string} slug "launcher"
 */
class LauncherPlugin extends Plugin {
	static pluginName = 'LauncherPlugin';

	static slug = 'launcher';

	static initialize(config = {}, ctx) {

		// Add launcher
		ctx.Filters.add('bluerain.system.routes', function launcher(route) {
			route[0].props.component = Launcher;
			return route;
		});

    // Add translations
		// ctx.Filters.add('bluerain.intl.messages', function eng(messages) {
		// 	const en = require('./lang/en.json');
		// 	const ur = require('./lang/ur.json');

		// 	messages.en =  Object.assign(messages.en ? messages.en : {}, en);
		// 	messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);

		// 	return messages;
		// });
	}
}

export default LauncherPlugin;
