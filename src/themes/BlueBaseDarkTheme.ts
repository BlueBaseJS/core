import { Theme } from '../registries/ThemeRegistry/Theme/theme';

export const BlueBaseDarkTheme: Theme = {
	name: 'BlueBase Dark',
	type: 'dark',

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
			color: 'rgb(255, 255, 255)',
			fontFamily: 'Roboto',
			fontSize: 16,
			fontWeight: '400',
			lineHeight: 1.5,
		}
	}
};
