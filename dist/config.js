'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


/**
 * This is the default configuration set
 * that is used at boot time.
 *
 * @namespace
 * @property {Object}		apps															Configurations for apps
 * @property {string}		appRoutePrefix [default: "/app"]	This route will be prependded to all app routes
 * @property {boolean}	debug [default: true, false if NODE_ENV="production"]							Debug mode
 * @property {boolean}	development [default: true, false if NODE_ENV="production"]				Development mode
 * @property {string}		locale [default: "en"]						App locale
 * @property {Object}		plugins														Configurations for plugins
 * @property {string}		title [default: "BlueRain OS"]		Main title of the app
 */
var Config = {
	apps: {},
	appRoutePrefix: '/app',
	debug: true,
	development: true,
	locale: 'en',
	plugins: {},
	title: 'BlueRain OS'
};

if (process.env.NODE_ENV === 'production') {
	Config.debug = false;
	Config.development = false;
}

exports.default = Config;