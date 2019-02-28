import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Palette, PaletteInput } from './Palette';
import { ThemeTypography, ThemeTypographyInput } from './Typography';
import { MaybeThunk } from '../../utils';

export interface ComponentStyles {
	// rule
	[key: string]: ViewStyle | TextStyle | ImageStyle | { [prop: string]: string };
}

export interface ThemeValue {
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

export interface ThemeValueInput {
	components?: ThemeValue['components'];
	shape?: Partial<ThemeValue['shape']>;
	spacing?: Partial<ThemeValue['spacing']>;
	typography?: ThemeTypographyInput;
	palette?: PaletteInput;
}
