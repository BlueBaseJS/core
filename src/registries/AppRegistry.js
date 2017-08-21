/* @flow */

import { Styles } from 'reactxp';

import {
	App,
	ConfigRegistry,
} from '../index';

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

	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the apps.
	 */
	getComponentSchema() {
		const apps = this.getApps();
		const appPrefix = ConfigRegistry.get('appRoutePrefix') || '/app'; // path = /app

		const appRoutes = [];
		for (const key in apps) {

			// skip loop if the property is from prototype
			if (!Object.prototype.hasOwnProperty.call(apps, key)) continue;

			const app = apps[key];
			app.appRoutePrefix = appPrefix;

			appRoutes.push({
				component: 'Route',
				props: {
					path: `${appPrefix}/${key}`,
					key,
					component: app
				}
			});
		}

		const style = Styles.createViewStyle({
			width: '100%',
			height: '100%',
		}, false);

		return {
			component: 'View',
			props: { style },
			children: appRoutes
		};
	}
}

const appRegistry = new AppRegistry();
export default appRegistry;
