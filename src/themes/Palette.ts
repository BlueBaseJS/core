export interface TypeText {
	primary: string;
	secondary: string;
	disabled: string;
	hint: string;
	icon: string;
}

export interface PaletteColor {
	light: string;
	main: string;
	dark: string;
	contrastText: string;
}

export interface TypeAction {
	active: string;
	hover: string;
	hoverOpacity: number;
	selected: string;
	disabled: string;
	disabledBackground: string;
}

export interface TypeBackground {
	default: string;

	/** Lighter shade of background */
	light: string;

	/** Darker share of background */
	dark: string;

	card: string;
}

export type TypeDivider = string;

export interface Palette {
	primary: PaletteColor;
	secondary: PaletteColor;
	success: PaletteColor;
	warning: PaletteColor;
	error: PaletteColor;
	info: PaletteColor;
	action: TypeAction;
	divider: TypeDivider;
	text: TypeText;
	background: TypeBackground;
}

export interface PaletteInput {
	primary?: Partial<PaletteColor>;
	secondary?: Partial<PaletteColor>;
	success?: Partial<PaletteColor>;
	warning?: Partial<PaletteColor>;
	error?: Partial<PaletteColor>;
	action?: Partial<TypeAction>;
	divider?: TypeDivider;
	text?: Partial<TypeText>;
	background?: Partial<TypeBackground>;
}

// tslint:disable:object-literal-sort-keys

export const light = {
	/** The colors used to style the text. */
	text: {
		/** The most important text. */
		primary: 'rgba(0, 0, 0, 0.87)',
		/** Secondary text. */
		secondary: 'rgba(0, 0, 0, 0.6)',
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
		default: '#f5f5f5',
		light: '#fafafa',
		dark: '#eeeeee',
	},

	/** The colors used to style the action elements. */
	action: {
		/** The color of an active action like an icon button. */
		active: 'rgba(0, 0, 0, 0.54)',
		/** The color of an hovered action. */
		hover: 'rgba(0, 0, 0, 0.04)',
		hoverOpacity: 0.04,
		/** The color of a selected action. */
		selected: 'rgba(0, 0, 0, 0.08)',
		/** The color of a disabled action. */
		disabled: 'rgba(0, 0, 0, 0.26)',
		/** The background color of a disabled action. */
		disabledBackground: 'rgba(0, 0, 0, 0.12)',
	},
	error: {
		contrastText: '#fff',
		dark: '#c62828',
		light: '#ef5350',
		main: '#d32f2f',
	},
	primary: {
		contrastText: '#fff',
		dark: '#42a5f5',
		light: '#e3f2fd',
		main: '#1976d2',
	},
	secondary: {
		contrastText: '#fff',
		dark: '#1565c0',
		light: '#42a5f5',
		main: '#ce93d8',
	},
	success: {
		contrastText: '#fff',
		dark: '#1b5e20',
		light: '#4caf50',
		main: '#2e7d32',
	},
	warning: {
		contrastText: '#fff',
		dark: '#e65100',
		light: '#ff9800',
		main: '#ed6c02',
	},
	info: {
		contrastText: '#fff',
		dark: '#01579b',
		light: '#03a9f4',
		main: '#0288d1',
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
		light: '#404040',
		dark: '#202020',
	},
	action: {
		active: '#ffffff',
		hover: 'rgba(255, 255, 255, 0.08)',
		hoverOpacity: 0.08,
		selected: 'rgba(255, 255, 255, 0.16)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBackground: 'rgba(255, 255, 255, 0.12)',
	},
	error: {
		contrastText: '#fff',
		dark: '#d32f2f',
		light: '#e57373',
		main: '#f44336',
	},
	primary: {
		contrastText: 'rgba(0, 0, 0, 0.87)',
		dark: '#42a5f5',
		light: '#e3f2fd',
		main: '#90caf9',
	},
	secondary: {
		contrastText: 'rgba(0, 0, 0, 0.87)',
		dark: '#ab47bc',
		light: '#f3e5f5',
		main: '#ce93d8',
	},
	success: {
		contrastText: 'rgba(0, 0, 0, 0.87)',
		dark: '#388e3c',
		light: '#81c784',
		main: '#66bb6a',
	},
	warning: {
		contrastText: 'rgba(0, 0, 0, 0.87)',
		dark: '#f57c00',
		light: '#ffb74d',
		main: '#ffa726',
	},
	info: {
		contrastText: 'rgba(0, 0, 0, 0.87)',
		dark: '#0288d1',
		light: '#4fc3f7',
		main: '#29b6f6',
	},
};

export function createPalette(mode: 'light' | 'dark') {
	const modeColors = mode === 'light' ? light : dark;

	return {
		...modeColors,
	};
}
