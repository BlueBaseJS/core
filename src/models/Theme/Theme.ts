import { Palette, PaletteInput } from './Palette';
import { TextStyle, ViewStyle } from 'react-native';
import { ThemeTypography, ThemeTypographyInput } from './Typography';

export interface ComponentStyles {

	// rule
	[key: string]: ViewStyle | TextStyle | any;
}

export interface Theme {
	/** Component styles */
	components: {

		// component name
		[key: string]: ComponentStyles
	};

	shape: {
		borderRadius: number,
		[key: string]: any,
	};

	spacing: {
		unit: number,
		[key: string]: any,
	};

	typography: ThemeTypography;

	palette: Palette;

	[key: string]: any,
}

export interface ThemeInput {
	components?: Theme['components'],
	shape?: Partial<Theme['shape']>,
	spacing?: Partial<Theme['spacing']>,
	typography?: ThemeTypographyInput,
	palette?: PaletteInput,
}