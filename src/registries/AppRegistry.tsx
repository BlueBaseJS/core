import { App, BlueRain } from '../index';
import { EsModule, MaybeEsModule } from '../typings';
import MapRegistry from './MapRegistry';
import React from 'react';
import isNil from 'lodash.isnil';
import kebabCase from 'lodash.kebabcase';

const defaultAppRoutePrefix = '/app';

/**
 * All system apps are stored in this registry
 * @property {Map<string, App>} data  Map(immutablejs) of all apps
 */
class AppRegistry extends MapRegistry<App> {
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		super('AppRegistry');
		this.BR = ctx;
	}

	/**
	 * Register an App
	 * @param {App} app The BlueRain app to register
	 */
	add(key: string | MaybeEsModule<App>, app?: MaybeEsModule<App>) {
		const { key: k, app: a } = getKeyAndItem(key, app);

		a.appRoutePrefix = this.BR.Configs.get('appRoutePrefix') || defaultAppRoutePrefix;
		a.path = `${a.appRoutePrefix}/${a.slug}`;

		super.add(k, a);
	}

	/**
	 * Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	set(key: string | MaybeEsModule<App>, app?: MaybeEsModule<App>) {
		const { key: k, app: a } = getKeyAndItem(key, app);

		a.appRoutePrefix = this.BR.Configs.get('appRoutePrefix') || defaultAppRoutePrefix;
		a.path = `${a.appRoutePrefix}/${a.slug}`;

		this.data = this.data.set(k, a);
	}

	/**
	 * Register many apps at once
	 * @param {Array<App>} apps The BlueRain apps to register
	 */
	registerMany(apps: Array<MaybeEsModule<App>>) {
		apps = apps || [];

		if (!Array.isArray(apps)) {
			throw new Error(
				'Apps parameter while registering via "registerMany" method must be an array'
			);
		}

		apps.forEach(app => { this.set(app)});
	}

	/**
	 * Initialize all the registered apps
	 */
	initializeAll() {
		this.data.forEach(app => {

			if (!app) {
				return;
			}

			// Add hooks from the 'hooks' static property of app
			if (app.hooks) {
				Object.keys(app.hooks).forEach(hook => {
					// Satisfy TS
					if (!app.hooks || !app.hooks[hook]) {
						return;
					}

					this.BR.Hooks.set(hook, `${app.slug}.${hook}`, app.hooks[hook]);
				});
			}

			// Add components from the 'components' static property of app
			if (app.components) {
				Object.keys(app.components).forEach(component => {
					// Satisfy TS
					if (!app.components || !app.components[component]) {
						return;
					}

					this.BR.Components.set(component, app.components[component]);
				});
			}

			// If the app has an initialize methid, call it
			if (app.initialize) {
				const config = this.BR.Configs.get(`apps.${app.slug}`);
				// app.config = config;
				app.initialize(config, this.BR);
			}
		});
	}

	/**
	 * Returns the JSON schema of the main APPs component.
	 * This component renders all the routes of apps.
	 *
	 * @returns {Object} JSON Schema
	 */
	getAllRoutes(): any[] {
		const appRoutes: object[] = [];

		this.data.forEach(BRApp => {
			if (!BRApp) {
				return;
			}

			const configs = this.BR.Configs.get(`apps.${BRApp.slug}`) || {};

			appRoutes.push({
				component: 'Route',
				props: {
					path: BRApp.path,
					key: BRApp.slug,
					component: (props: any) => {
						return <BRApp bluerain={this.BR} configs={configs} {...props} />;
					}
				}
			});
		});

		return appRoutes;
	}
}

export default AppRegistry;

/**
 * Takes an app, adds necessary fields and returns the processed app with a key
 * @param key
 * @param app
 */
const getKeyAndItem = (
	key: string | MaybeEsModule<App>,
	app?: MaybeEsModule<App>
): { key: string; app: App } => {
	if (typeof key !== 'string' && !isNil(key)) {
		app = key as App;
		key = '';
	}

	if (isNil(app)) {
		throw new Error(`App cannot be ${app}.Please provide valid app while registering an app.`);
	}

	// ES modules
	app = (app as EsModule<App>).__esModule ? (app as EsModule<App>).default : app;

	// Casting, to remove possiblity of undefined value is TS.
	app = app as App;

	if (!app.appName) {
		throw new Error('App name not provided. Please provide "appName" while registering an app');
	}

	const slug = kebabCase(app.slug ? app.slug : app.appName);

	app.slug = slug;
	// app.appRoutePrefix = BR.Configs.get('appRoutePrefix') || defaultAppRoutePrefix;
	// app.path = `${app.appRoutePrefix}/${app.slug}`;

	const strKey = key && typeof key === 'string' ? key : slug;
	return { key: strKey, app };
};
