import { ThemeInput } from '../models';

export const BlueBaseDarkTheme: ThemeInput = {
	name: 'BlueBase Dark',
	type: 'dark',

	// tslint:disable-line
	direction: 'ltr',
	palette: {
		action: {
			active: 'rgba(255, 255, 255, 1)',
			disabled: 'rgba(255, 255, 255, 0.3)',
			disabledBackground: 'rgba(255, 255, 255, 0.12)',
			hover: 'rgba(255, 255, 255, 0.1)',
			hoverOpacity: 0.1,
			selected: 'rgba(255, 255, 255, 0.2)',
		},
		background: {
			card: '#424242',
			default: '#303030',
		},
		divider: 'rgba(255, 255, 255, 0.12)',
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
		text: {
			disabled: 'rgba(255, 255, 255, 0.5)',
			hint: 'rgba(255, 255, 255, 0.5)',
			primary: 'rgba(255, 255, 255, 1)',
			secondary: 'rgba(255, 255, 255, 0.7)',
		},
	},
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
