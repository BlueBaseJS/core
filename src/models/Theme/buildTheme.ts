import { BlueBaseDarkTheme, BlueBaseLightTheme } from '../../themes';
import { Theme, ThemeInput } from '../../registries';
import deepmerge  from 'deepmerge';

export const buildTheme = (mode: 'light' | 'dark' = 'light') => (...overrides: ThemeInput[]): Theme => {

	const base: ThemeInput = (mode === 'light') ? BlueBaseLightTheme : BlueBaseDarkTheme;
	const mergedInput = deepmerge.all([base, ...overrides]) as Theme;

	const { value, ...rest } = mergedInput;
	return { ...rest, ...value };
};
