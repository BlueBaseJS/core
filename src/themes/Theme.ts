import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Palette, PaletteInput, createPalette } from './Palette';
import { ThemeTypography, ThemeTypographyInput, createTypography } from './Typography';

import { MaybeThunk } from '../utils';
import deepmerge from 'deepmerge';
import { elevation } from './elevation';

export interface ComponentStyles {
	// rule
	[key: string]: ViewStyle | TextStyle | ImageStyle | { [prop: string]: string };
}

export interface ThemeVariant {
	/** Component styles */
	components: {
		// component name
		[key: string]: MaybeThunk<ComponentStyles>;
	};

	elevation: (value: number) => Partial<ViewStyle>;

	shape: {
		borderRadius: number;
		[key: string]: any;
	};

	spacing: {
		unit: number;
		[key: string]: any;
	};

	typography: ThemeTypography;

	palette: Palette;

	// tslint:disable-next-line
	// TODO: Add shadows. Example: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/shadows.js

	[key: string]: any;
}

export interface ThemeVariantInput extends Omit<Partial<ThemeVariant>, 'palette' | 'typography'> {
	palette?: PaletteInput;
	typography?: ThemeTypographyInput;
}

export interface BaseTheme {
	name: string;
	key: string;
	light: ThemeVariant;
	dark: ThemeVariant;
}

export interface ThemeInput {
	name?: string;
	key?: string;
	light?: ThemeVariantInput;
	dark?: ThemeVariantInput;
}

const DEFAULT_DARK_PALETTE = createPalette('dark');
const DEFAULT_LIGHT_PALETTE = createPalette('light');

export function createThemeVariant(palette: Palette, typography: ThemeTypography): ThemeVariant {
	return {
		components: {},
		elevation,
		palette,
		shape: {
			borderRadius: 4,
		},
		spacing: {
			unit: 8,
		},
		typography,
	};
}

export class Theme implements BaseTheme {
	public name: string;
	public key: string;

	public light: ThemeVariant;
	public dark: ThemeVariant;

	public mode: 'light' | 'dark' = 'light';

	constructor(input: ThemeInput = {}, ...overrides: ThemeInput[]) {
		const final: BaseTheme = deepmerge.all([
			{
				key: 'bluebase-theme',
				name: 'BlueBase Theme',

				light: createThemeVariant(DEFAULT_LIGHT_PALETTE, createTypography(DEFAULT_LIGHT_PALETTE)),

				dark: createThemeVariant(DEFAULT_DARK_PALETTE, createTypography(DEFAULT_DARK_PALETTE)),
			},
			input,
			...overrides,
		]) as BaseTheme;

		this.key = final.key;
		this.name = final.name;

		this.light = final.light;
		this.dark = final.dark;
	}

	public get components() {
		return this[this.mode].components;
	}

	public get elevation() {
		return this[this.mode].elevation;
	}

	public get palette() {
		return this[this.mode].palette;
	}

	public get shape() {
		return this[this.mode].shape;
	}

	public get spacing() {
		return this[this.mode].spacing;
	}

	public get typography() {
		return this[this.mode].typography;
	}
}
