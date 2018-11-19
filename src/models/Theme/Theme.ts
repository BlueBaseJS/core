import { TextStyle, ViewStyle } from 'react-native';
import { Palette } from './Palette';
import { ThemeTypography } from './Typography';

// TODO: Do we need this now?
export interface ThemeInput extends Pick<Theme, Exclude<keyof Theme, 'slug'>> {
	slug?: string;
}

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
