import { ThemeInput } from '../../registries';
import { createPalette } from '../helpers/createPalette';
import { createTheme } from '../helpers/createTheme';
import { createTypography } from '../helpers/createTypography';

const palette = createPalette('light');
const typography = createTypography(palette);
const theme = createTheme(palette, typography);

export const BlueBaseLightTheme: ThemeInput = {
	alternate: 'bluebase-dark',
	key: 'bluebase-light',
	mode: 'light',
	name: 'BlueBase Light',
	value: theme,
};
