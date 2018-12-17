// tslint:disable:object-literal-sort-keys

export const light = {
  /** The colors used to style the text. */
	text: {
    /** The most important text. */
		primary: 'rgba(0, 0, 0, 0.87)',
    /** Secondary text. */
		secondary: 'rgba(0, 0, 0, 0.54)',
    /** Disabled text have even lower visual prominence. */
		disabled: 'rgba(0, 0, 0, 0.38)',
    /** Text hints. */
		hint: 'rgba(0, 0, 0, 0.38)',
		/** Icon color */
		icon: 'rgba(0, 0, 0, 0.38)',
	},

	/** The color used to divide different elements. */
	divider: 'rgba(0, 0, 0, 0.12)',

	/**
	 * The background colors used to style the surfaces.
	 * Consistency between these values is important.
	 */
	background: {
		card: '#ffffff',
		default: '#fafafa',
	},

	/** The colors used to style the action elements. */
	action: {
    /** The color of an active action like an icon button. */
		active: 'rgba(0, 0, 0, 0.54)',
    /** The color of an hovered action. */
		hover: 'rgba(0, 0, 0, 0.08)',
		hoverOpacity: 0.08,
    /** The color of a selected action. */
		selected: 'rgba(0, 0, 0, 0.14)',
    /** The color of a disabled action. */
		disabled: 'rgba(0, 0, 0, 0.26)',
    /** The background color of a disabled action. */
		disabledBackground: 'rgba(0, 0, 0, 0.12)',
	},
};

export const dark = {
	text: {
		primary: '#ffffff',
		secondary: 'rgba(255, 255, 255, 0.7)',
		disabled: 'rgba(255, 255, 255, 0.5)',
		hint: 'rgba(255, 255, 255, 0.5)',
		icon: 'rgba(255, 255, 255, 0.5)',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	background: {
		card: '#424242',
		default: '#303030',
	},
	action: {
		active: '#ffffff',
		hover: 'rgba(255, 255, 255, 0.1)',
		hoverOpacity: 0.1,
		selected: 'rgba(255, 255, 255, 0.2)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBackground: 'rgba(255, 255, 255, 0.12)',
	},
};


const common = {
	error: {
		contrastText: '#fff',
		dark: '#d32f2f',
		light: '#e57373',
		main: '#f44336',
	},
	primary: {
		contrastText: '#fff',
		dark: '#303f9f',
		light: '#7986cb',
		main: '#3f51b5',
	},
	secondary: {
		contrastText: '#fff',
		dark: '#c51162',
		light: '#ff4081',
		main: '#f50057',
	},
};

export function createPalette(mode: 'light' | 'dark') {
	const modeColors = (mode === 'light') ? light : dark;

	return {
		...modeColors,
		...common,
	};
}