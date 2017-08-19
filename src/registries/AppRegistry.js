/* @flow */

import App from '../App/App';

/**
 * All system apps are stored in this registry
 * @property {Object} AppsTable Storage table of all apps
 */
class AppRegistry {

	AppsTable: {} = {};

	/**
	 * Register an App
	 */
	register(app: App) {
		if (app === undefined || app === null) {
			throw new Error('No app provided');
		}

		this.AppsTable[app.slug] = app;
	}

	/**
	 * Register many apps at once
	 */
	registerMany(apps: Array<App>) {
		const me = this;
		apps = apps || [];

		if (!Array.isArray(apps)) {
			throw new Error('apps parameter must be an Array');
		}

		apps.forEach((app) => {
			me.register(app);
		});
	}

	/**
	 * Remove an app from the registry
	 */
	remove(name: string) {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		}
		if (!this.AppsTable[name]) {
			throw new Error(`${name} is not registered.`);
		}
		delete this.AppsTable[name];
	}

	/**
	 * Get all apps
	 */
	getApps() : {} {
		return this.AppsTable;
	}
}

const appRegistry = new AppRegistry();
export default appRegistry;
