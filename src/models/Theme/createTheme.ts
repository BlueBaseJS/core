import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../../themes';
import { Theme, ThemeInput } from './Theme';
import deepmerge  from 'deepmerge';

export function createTheme(mode: 'light' | 'dark' = 'light', ...overrides: ThemeInput[]) {

	const base = (mode === 'light') ? BlueBaseLightTheme : BlueBaseDarkTheme;
	return deepmerge.all([base, ...overrides]) as Theme;
}
