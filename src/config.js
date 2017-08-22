/* @flow */

export type ConfigType = {
	apps: { [string]: {} },
	appRoutePrefix: string,
	debug: boolean,
	development: boolean,
	plugins: { [string]: {} },
	title: string,
};

/**
 * This is the default configuration set
 * that is used at boot time.
 *
 * @namespace
 * @property {Object}		apps															Configurations for apps
 * @property {string}		appRoutePrefix [default: "/app"]	This route will be prependded to all app routes
 * @property {boolean}	debug [default: true]							Debug mode
 * @property {boolean}	development [default: true]				Development mode
 * @property {Object}		plugins														Configurations for plugins
 * @property {string}		title [default: "BlueRain OS"]		Main title of the app
 */
const Config: ConfigType = {
	apps: {},
	appRoutePrefix: '/app',
	debug: true,
	development: true,
	plugins: {},
	title: 'BlueRain OS',
};

export default Config;
