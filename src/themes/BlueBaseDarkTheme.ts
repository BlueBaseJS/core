import { ThemeRegistryItem } from '../registries';
import { createPalette } from './createPalette';
import { createTheme } from './createTheme';
import { createTypography } from './createTypography';

const palette = createPalette('dark');
const typography = createTypography(palette);
const theme = createTheme(palette, typography);

export const BlueBaseDarkTheme: ThemeRegistryItem = {
	alternate: 'bluebase-light',
	mode: 'dark',
	name: 'BlueBase Dark',
	slug: 'bluebase-dark',
	theme
};
