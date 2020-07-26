import React, { createContext } from 'react';
import { Theme, ThemeInput } from './Theme';
import { useBlueBase, useConfig } from '../hooks';

import { Configs } from '../Configs';

/**
 * Props of the `ThemeProvider` component.
 */
export interface ThemeProviderProps {
	/**
	 * Key of the theme to use for children components. If this prop is not set,
	 * the globally selected theme is used.
	 */
	theme?: Configs['theme.name'];

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
 * Interface of object passed as param to the ThemeConsumer render prop method.
 */
export interface ThemeContextData {
	/** Helper method to change current theme. */
	changeTheme: (slug: string) => void;

	changeMode: (mode: Configs['theme.mode']) => void;

	/** Selected theme varaint */
	theme: Theme;
}

/**
 * This is the context where BlueBase theme is stored.
 */
export const ThemeContext: React.Context<ThemeContextData> = createContext(undefined as any);

/**
 * BlueBase theme consumer.
 */
export const ThemeConsumer = ThemeContext.Consumer;

/**
 * 🎨 ThemeProvider
 */
export const ThemeProvider = (props: ThemeProviderProps) => {
	const BB = useBlueBase();

	const [themeName, changeTheme] = useConfig('theme.name');
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

	return <ThemeContext.Provider value={value} children={props.children} />;
};

ThemeProvider.displayName = 'ThemeProvider';

ThemeProvider.defaultProps = {
	overrides: {},
};
