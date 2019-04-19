import { ThemeValueInput } from './themes/structure/Theme';
import { isProduction } from './utils';

export interface Configs {
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
	 * FIXME: This key contains the slug, but is called name. This is confusing.
	 */
	'theme.name': string;

	/**
	 * Theme mode: Either light or dark.
	 * TODO: Add 'auto' mode to detect OS/User preference? This will be added to configs.
	 */
	'theme.mode': 'light' | 'dark';

	/**
	 * Overrides for any selected theme. These overrides are applied to all themes.
	 */
	'theme.overrides': ThemeValueInput;

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

	// others
	[key: string]: any;
}

export const BlueBaseDefaultConfigs: Configs = {
	debug: !isProduction(),
	development: !isProduction(),
	direction: 'auto',
	locale: 'en',
	'locale.options': {
		en: 'English',
		ur: 'اُردُو',
	},
	pluginRoutePathPrefix: 'p',
	'theme.mode': 'light',
	'theme.name': 'bluebase-light',
	'theme.overrides': {},
	title: 'BlueBase',
};
