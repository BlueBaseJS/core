import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../../themes';
import { Theme } from './Theme';
import deepmerge  from 'deepmerge';

export function createTheme(mode: 'light' | 'dark' = 'light', ...overrides: Array<Partial<Theme>>) {

	const base = (mode === 'light') ? BlueBaseLightTheme : BlueBaseDarkTheme;
	return deepmerge.all([base, ...overrides]) as Theme;
}
