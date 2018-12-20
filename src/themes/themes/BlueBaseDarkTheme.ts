import { ThemeInput } from '../../registries';
import { createPalette } from '../helpers/createPalette';
import { createTheme } from '../helpers/createTheme';
import { createTypography } from '../helpers/createTypography';

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
