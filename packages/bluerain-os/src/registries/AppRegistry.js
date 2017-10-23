/* @flow */

import kebabCase from 'lodash.kebabcase';
import isNil from 'lodash.isnil';

import MapRegistry from './MapRegistry';
import BR, { App } from '../index';

const defaultAppRoutePrefix = '/app';

/**
 * All system apps are stored in this registry
 * @property {Map<string, App>} data  Map(immutablejs) of all apps
 */
class AppRegistry extends MapRegistry {

	data: Map<string, App>;

	constructor() {
		super('AppRegistry');
	}
  /**
   * Register an App To be deprecated in 2.0.0
   * @param {App} app The BlueRain app to register
   */
	register(app: App) {
		console.warn('Deprecation Warning: "register" method of AppRegistry has been deprecated. Please use "set" method instead.');
		this.set(app);
	}
	/**
	 * Register an App
	 * @param {App} app The BlueRain app to register
	 */
	set(app: App) {
		if (isNil(app)) {
			throw new Error(`App cannot be ${app}`);
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

		super.set(app.slug, app);
	}

	/**
	 * Register many apps at once
	 * @param {Array<App>} apps The BlueRain apps to register
	 */
	registerMany(apps: Array<App>) {
		const me = this;
		apps = apps || [];

		if (!Array.isArray(apps)) {
			throw new Error('Apps parameter must be an array');
		}

		apps.forEach(app => me.set(app));
	}

	/**
	 * Initialize all the registered apps
	 */
	initializeAll() {
		for (const app of this.data.values()) {
			if (app.initialize) {
				const config = BR.Configs.get(`apps.${app.slug}`);
				app.config = config;
				app.initialize(config, BR);
			}
		}
	}

	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the routes of apps.To be deprecated in 2.0.0
	 *
	 * @returns {Object} JSON Schema
	 */
	getComponentSchema() : Array<*> {
		console.warn('Deprecation Warning: "getComponentSchema" method of AppRegistry has been deprecated. Please use "getAllRoutes" method instead.');
		return this.getAllRoutes();
	}
	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the routes of apps.
	 *
	 * @returns {Object} JSON Schema
	 */
	getAllRoutes() : Array<*> {
		const appRoutes = [];
		for (const app of this.data.values()) {
			appRoutes.push({
				component: 'Route',
				props: {
					path: app.path,
					key: app.slug,
					component: app
				}
			});
		}

		return appRoutes;
	}
}

export default AppRegistry;
