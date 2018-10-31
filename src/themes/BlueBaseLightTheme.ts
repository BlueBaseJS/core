import { Theme } from '../registries/ThemeRegistry/Theme/theme';

export const BlueBaseLightTheme: Theme = {
	name: 'BlueBase Light',
	type: 'light',

	// tslint:disable-line
	direction: 'ltr',
	shape: {
		borderRadius: 4,
	},
	spacing: {
		unit: 8,
	},
	typography: {
		body1: {
			color: 'rgba(0, 0, 0, 0.87)',
			fontFamily: 'Roboto',
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 1.5,
		}
	}
};
