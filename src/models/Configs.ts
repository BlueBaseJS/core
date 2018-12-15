import { ThemeInput } from '.';

export interface Configs {

	/** Project title */
	title: string,

	/** Project locale. Defaults to 'en' */
	locale: string,

	/** Text direction of content */
	direction: 'ltr' | 'rtl',

	/** Debug mode. By default it's true in development enviornment */
	debug: boolean,

	/** Development mode */
	development: boolean,

	/**
	 * Name of selected theme.
	 * FIXME: This key contains the slug, but is called name. This is confusing.
	 */
	'theme.name': string,

	/**
	 * Theme mode: Either light or dark.
	 * TODO: Add 'auto' mode to detect OS/User preference? This will be added to configs.
	 */
	'theme.mode': 'light' | 'dark',

	/**
	 * Overrides for any selected theme. These overrides are applied to all themes.
	 */
	'theme.overrides': ThemeInput,

	// others
	[key: string]: any,
}
