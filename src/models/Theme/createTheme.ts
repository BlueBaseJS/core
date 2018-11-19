import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../../themes';
import { Theme } from './Theme';
import deepmerge  from 'deepmerge';

export function createTheme(theme: Partial<Theme>) {

	const type = theme.type || 'light';
	const base = (type === 'light') ? BlueBaseLightTheme : BlueBaseDarkTheme;
	return deepmerge(base, theme);
}
