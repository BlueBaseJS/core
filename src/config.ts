export type ConfigType = {
	apps: {};
	appRoutePrefix: string;
	debug: boolean;
	development: boolean;
	locale?: string;
	plugins: {};
	title: string;
	theme?: {};

	wallpaper?: {
		source: string;
		backgroundColor?: string;
		resizeMode?: string;
	};
};

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
 * @property {string}		theme															Theme to customize styling
 * @property {object}		wallpaper													The wallpaper object
 * @property {string}		wallpaper.source									URL of the image source to display in the background
 * @property {string}		wallpaper.backgroundColor					Background color of the wallpaper
 * @property {string}		wallpaper.resizeMode							Determines how to resize the image when the frame doesn't
 * match the raw image dimensions. Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
 */
const Config: ConfigType = {
	apps: {},
	appRoutePrefix: '/app',
	debug: true,
	development: true,
	plugins: {},
	title: 'BlueRain OS'
};

if (process.env.NODE_ENV === 'production') {
	Config.debug = false;
	Config.development = false;
}

export default Config;
