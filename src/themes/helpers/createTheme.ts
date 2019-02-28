import { Palette, ThemeTypography } from '../structure';
import { elevation } from './elevation';

export function createTheme(palette: Palette, typography: ThemeTypography) {
	return {
		components: {},
		elevation,
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
