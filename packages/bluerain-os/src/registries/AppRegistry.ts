
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

	// data: Map<string, App>;

	constructor() {
		super('AppRegistry');
	}
  /**
   * Register an App To be deprecated in 2.0.0
   * @param {App} app The BlueRain app to register
   */
	register(app: App) {
		console.warn('Deprecation Warning: "register" method of AppRegistry has been deprecated.'+
		' Please use "set" method instead.');
		this.set(app);
	}
	/**
	 * Register an App
	 * @param {App} app The BlueRain app to register
	 */
// cheated here to remove ts error: set(app: App) is not compatible with
// set(key: string, item: any, ...rest: any[])
	set(app: App|any) {
		if (isNil(app)) {
			throw new Error(`App cannot be ${app}.Please provide valid app while registering an app.`);
		}

		if (!app.appName) {
			throw new Error('App name not provided. Please provide "appName" while registering an app');
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
	registerMany(apps: App[]) {
		apps = apps || [];

		if (!Array.isArray(apps)) {
			throw new Error('Apps parameter while registering via "registerMany" method must be an array');
		}

		apps.forEach(app => this.set(app));
	}

	/**
	 * Initialize all the registered apps
	 */
	initializeAll() {
		this.data.forEach(app => {
			if (app.hooks) {
				Object.keys(app.hooks).forEach((hook) => {
					BR.Hooks.add(hook, `${app.slug}.${hook}`, app.hooks[hook]);
				});
			}
			if (app.initialize) {
				const config = BR.Configs.get(`apps.${app.slug}`);
				app.config = config;
				app.initialize(config, BR);
			}
		});
	}

	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the routes of apps.To be deprecated in 2.0.0
	 *
	 * @returns {Object} JSON Schema
	 */
	getComponentSchema() : any[] {
		console.warn('Deprecation Warning: "getComponentSchema" method of AppRegistry has been deprecated.'+
		' Please use "getAllRoutes" method instead.');
		return this.getAllRoutes();
	}
	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the routes of apps.
	 *
	 * @returns {Object} JSON Schema
	 */
	getAllRoutes() : any[] {
		const appRoutes:object[] = [];
		this.data.forEach(app => {
			appRoutes.push({
				component: 'Route',
				props: {
					path: app.path,
					key: app.slug,
					component: app
				}
			});
		});

		return appRoutes;
	}
}

export default AppRegistry;
