import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Palette, PaletteInput } from './Palette';
import { ThemeTypography, ThemeTypographyInput } from './Typography';
import { MaybeThunk } from '../../utils';

export interface ComponentStyles {

	// rule
	[key: string]: ViewStyle | TextStyle | ImageStyle | { [prop: string]: string };
}

export interface Theme {
	/** Component styles */
	components: {

		// component name
		[key: string]: MaybeThunk<ComponentStyles>
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