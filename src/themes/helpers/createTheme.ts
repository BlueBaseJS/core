import { Palette, ThemeTypography } from '../structure';

export function createTheme(palette: Palette, typography: ThemeTypography) {
	return {
		components: {},
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