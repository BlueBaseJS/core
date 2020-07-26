import { Theme, ThemeInput } from './Theme';
import { ThemeContext, ThemeContextData } from '../contexts';
import { useBlueBase, useConfig } from '../hooks';

import { Configs } from '../Configs';
import React from 'react';

/**
 * Props of the `ThemeProvider` component.
 */
export interface ThemeProviderProps {
	/**
	 * Key of the theme to use for children components. If this prop is not set,
	 * the globally selected theme is used.
	 */
	theme?: Configs['theme'];

	/**
	 * Theme mode
	 */
	mode?: Configs['theme.mode'];

	/**
	 * Any custom overrides to the selected theme.
	 */
	overrides: ThemeInput;

	children: React.ReactNode;
}

/**
 * 🎨 ThemeProvider
 */
export const ThemeProvider = (props: ThemeProviderProps) => {
	const BB = useBlueBase();

	const [themeName, changeTheme] = useConfig('theme');
	const [modeConfig, changeMode] = useConfig('theme.mode');
	const [overridesConfig] = useConfig<ThemeInput>('theme.overrides');

	const key = props.theme || themeName;
	const mode = props.mode || modeConfig;

	const registryTheme = BB.Themes.getValue(key);

	if (!registryTheme) {
		BB.Logger.warn(
			`Could not load theme. Reason: Theme with the key "${key}" does not exist. Falling back to default theme.`
		);
	}

	const theme = new Theme(registryTheme, overridesConfig, props.overrides);

	theme.mode = mode;

	const value: ThemeContextData = {
		changeMode,
		changeTheme,
		theme,
	};

	return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
};

ThemeProvider.displayName = 'ThemeProvider';

ThemeProvider.defaultProps = {
	overrides: {},
};
