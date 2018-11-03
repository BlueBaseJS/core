import { Palette } from './palette';
import { ThemeTypography } from './typography';

export interface Theme {
	name: string,
	type: 'light' | 'dark',
	direction: 'ltr' | 'rtl',
	shape: {
		borderRadius: number,
	},
	spacing: {
		unit: number,
	}
	typography: ThemeTypography,
	palette: Palette
}