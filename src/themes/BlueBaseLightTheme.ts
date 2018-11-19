import { ThemeRegistryItem } from '../registries';

export const BlueBaseLightTheme: ThemeRegistryItem = {
	mode: 'light',
	name: 'BlueBase Light',
	slug: 'bluebase-light',
	theme: {
		components: {},
		palette: {
			action: {
				active: 'rgba(0, 0, 0, 0.54)',
				disabled: 'rgba(0, 0, 0, 0.26)',
				disabledBackground: 'rgba(0, 0, 0, 0.12)',
				hover: 'rgba(0, 0, 0, 0.08)',
				hoverOpacity: 0.08,
				selected: 'rgba(0, 0, 0, 0.14)',
			},
			background: {
				card: '#fff',
				default: '#fafafa',
			},
			divider: 'rgba(0, 0, 0, 0.12)',
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
				disabled: 'rgba(0, 0, 0, 0.38)',
				hint: 'rgba(0, 0, 0, 0.38)',
				primary: 'rgba(0, 0, 0, 0.87)',
				secondary: 'rgba(0, 0, 0, 0.54)',
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
				color: 'rgba(0, 0, 0, 0.87)',
				fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
				fontSize: 16,
				fontWeight: '400',
				// lineHeight: 1.5,
			},
		},
	}
};
