/* @flow */

// import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import Launcher from './layout';

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
		ctx.Components.replace('IndexPage', Launcher);
	}
}

export default LauncherPlugin;
