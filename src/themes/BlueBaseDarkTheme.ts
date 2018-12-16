import { ThemeInput } from '../registries';
import { createPalette } from './createPalette';
import { createTheme } from './createTheme';
import { createTypography } from './createTypography';

const palette = createPalette('dark');
const typography = createTypography(palette);
const theme = createTheme(palette, typography);

export const BlueBaseDarkTheme: ThemeInput = {
	alternate: 'bluebase-light',
	key: 'bluebase-dark',
	mode: 'dark',
	name: 'BlueBase Dark',
	value: theme,
};
