/* @flow */

import App from './models/App';

/**
 * storage for infos about Apps
 */
export const AppsTable: {} = {};

/**
 * Register an app in the system
 */
export const registerApp = (app: App) => {
	if (app === undefined || app === null) {
		throw new Error('No app provided');
	}

	const name = app.slug;

	AppsTable[name] = app;
};

/**
 * Register multiple apps in the system
 */
export const registerApps = (apps: {}) => {
	for (const key in apps) {
    // skip loop if the property is from prototype
		if (!Object.prototype.hasOwnProperty.call(apps, key)) continue;

		registerApp(apps[key]);
	}
};

/**
 * Remove an app from the registry
 */
export const removeApp = (name: string) => {
	if (name === undefined || name === null) {
		throw new Error(`name cannot be ${name}`);
	}
	if (!Object.prototype.hasOwnProperty.call(AppsTable, name)) {
		throw new Error(`${name}is not registered.`);
	}
	delete AppsTable[name];
};

export const getAppRoutes = () => {
	const appRoutes = [];
	for (const key in AppsTable) {
			// skip loop if the property is from prototype
		if (!Object.prototype.hasOwnProperty.call(AppsTable, key)) continue;

		const app = AppsTable[key].App;
		if (app.routes) {
			appRoutes.push(app.routes());
		}
	}
	return appRoutes;
};
