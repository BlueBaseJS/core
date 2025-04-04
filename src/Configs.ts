import { ThemeInput } from './themes';

export interface Configs {
	[key: string]: any;

	/** Project title */
	title: string;

	/** Project locale. Defaults to 'en' */
	locale: string;

	/** Selectable locale options to show in the app */
	'locale.options': { [key: string]: string };

	/**
	 * Content direction.
	 *
	 * If auto is selected, direction is changed with locale.
	 */
	direction: 'ltr' | 'rtl' | 'auto';

	/** Debug mode. By default it's true in development enviornment */
	debug: boolean;

	/** Development mode */
	development: boolean;

	/** Prefix that is added to top level plugin route paths */
	pluginRoutePathPrefix: string;

	/**
	 * Name of selected theme.
	 */
	theme: string;

	/**
	 * Theme mode: Either light or dark.
	 */
	'theme.mode': 'light' | 'dark' | 'auto';

	/**
	 * Overrides for any selected theme. These overrides are applied to all themes.
	 */
	'theme.overrides': Partial<ThemeInput>;

	/**
	 * App version
	 */
	version?: string;

	/**
	 * Author Name
	 */
	author?: string;

	/**
	 * Author Website or Email URL
	 */
	authorUrl?: string;
}

export const BlueBaseDefaultConfigs: Configs = {
	debug: false,
	development: true,
	direction: 'auto',
	locale: 'en',
	'locale.options': {
		en: 'English',
		ur: 'اُردُو',
	},
	pluginRoutePathPrefix: 'p',
	theme: 'bluebase-theme',
	'theme.mode': 'auto',
	'theme.overrides': {
		dark: {},
		light: {},
	},
	title: 'BlueBase',
};
