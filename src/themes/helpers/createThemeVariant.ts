import { Palette, ThemeTypography, ThemeVariant } from '../structure';

import { elevation } from './elevation';

export function createThemeVariant(palette: Palette, typography: ThemeTypography): ThemeVariant {
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
