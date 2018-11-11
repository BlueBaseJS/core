export interface BlueBaseConfigs {

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

	/** Selected theme */
	theme: string;

	// others
	[key: string]: any,
}
