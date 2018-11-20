import { ThemeRegistryItem } from '../registries';
import { createPalette } from './createPalette';
import { createTheme } from './createTheme';
import { createTypography } from './createTypography';

const palette = createPalette('light');
const typography = createTypography(palette);
const theme = createTheme(palette, typography);

export const BlueBaseLightTheme: ThemeRegistryItem = {
	mode: 'light',
	name: 'BlueBase Light',
	slug: 'bluebase-light',
	theme
};
