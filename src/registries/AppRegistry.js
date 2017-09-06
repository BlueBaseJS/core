/* @flow */

import kebabCase from 'lodash.kebabcase';

import BR from '../index';

const defaultAppRoutePrefix = '/app';

/**
 * All system apps are stored in this registry
 * @property {Object} AppsTable Storage table of all apps
 */
class AppRegistry {

	AppsTable: { [string]: BR.App } = {};

	/**
	 * Register an App
	 * @param {App} app The BlueRain app to register
	 */
	register(app: BR.App) {
		if (app === undefined || app === null) {
			throw new Error('No app provided');
		}

		if (!app.appName) {
			throw new Error('App name not provided.');
		}

		if (!app.slug) {
			app.slug = app.appName;
		}

		app.slug = kebabCase(app.slug);
		app.appRoutePrefix = BR.Configs.get('appRoutePrefix') || defaultAppRoutePrefix;
		app.path = `${app.appRoutePrefix}/${app.slug}`;

		this.AppsTable[app.slug] = app;
	}

	/**
	 * Register many apps at once
	 * @param {Array<App>} apps The BlueRain apps to register
	 */
	registerMany(apps: Array<BR.App>) {
		const me = this;
		apps = apps || [];

		if (!Array.isArray(apps)) {
			throw new Error('apps parameter must be an Array');
		}

		apps.forEach(app => me.register(app));
	}

	/**
	 * Initialize all apps
	 */
	initializeAll() {
		const me = this;
		Object.keys(me.AppsTable).forEach((key) => {

			const app = me.AppsTable[key];
			if (app.initialize) {
				const config = BR.Configs.get(`apps.${app.slug}`);
				app.config = config;
				app.initialize(config, BR);
			}

		});

	}

	/**
	 * Remove an app from the registry
	 * @param {string} slug The slug of the app to remove
	 */
	remove(slug: string) {
		if (slug === undefined || slug === null) {
			throw new Error(`slug cannot be ${slug}`);
		}
		if (!this.AppsTable[slug]) {
			throw new Error(`${slug} is not registered.`);
		}
		delete this.AppsTable[slug];
	}

	/**
	 * Get all apps
	 * @returns {Object} An object with slug: app key value pair
	 */
	getApps() : { [string]: BR.App } {
		return this.AppsTable;
	}

	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the apps.
	 *
	 * @returns {Object} JSON Schema
	 */
	getComponentSchema() : Array<*> {
		const apps = this.getApps();

		const appRoutes = [];
		for (const key in apps) {

			// skip loop if the property is from prototype
			if (!Object.prototype.hasOwnProperty.call(apps, key)) continue;

			const app = apps[key];

			appRoutes.push({
				component: 'Route',
				props: {
					path: app.path,
					key,
					component: app
				}
			});
		}

		return appRoutes;
	}
}

export default AppRegistry;
