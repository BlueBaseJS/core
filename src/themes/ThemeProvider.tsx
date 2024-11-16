import React from 'react';

import { Configs } from '../Configs';
import { ThemeContext, ThemeContextData } from '../contexts';
import { ColorSchemeName, useBlueBase, useColorScheme, useConfig } from '../hooks';
import { Theme, ThemeInput } from './Theme';

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
	mode?: ColorSchemeName;

	/**
	 * Any custom overrides to the selected theme.
	 */
	overrides?: ThemeInput;

	children: React.ReactNode;
}

/**
 * 🎨 ThemeProvider
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	theme,
	mode,
	overrides = {},
}) => {
	const BB = useBlueBase();
	const colorScheme = useColorScheme();

	const [modeConfig, changeMode] = useConfig('theme.mode');
	const [themeName, changeTheme] = useConfig('theme');
	const [overridesConfig] = useConfig<ThemeInput>('theme.overrides');

	const themeKey = theme ?? themeName;
	const themeMode = mode ?? colorScheme;

	const registryTheme = BB.Themes.getValue(themeKey);

	if (!registryTheme) {
		BB.Logger.warn(
			// eslint-disable-next-line max-len
			`Could not load theme. Reason: Theme with the key "${themeKey}" does not exist. Falling back to default theme.`
		);
	}

	const mergedTheme = new Theme(registryTheme, overridesConfig, overrides);
	mergedTheme.mode = themeMode;

	const contextValue: ThemeContextData = {
		changeMode,
		changeTheme,
		theme: mergedTheme,
		modeConfig,
	};

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

ThemeProvider.displayName = 'ThemeProvider';
