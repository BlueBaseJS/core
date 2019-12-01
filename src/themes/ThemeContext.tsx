import React, { createContext, useContext, useEffect, useState } from 'react';

import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';
import { Theme } from '../registries';
import { ThemeValueInput } from './structure';
import { buildTheme } from './helpers';
import deepmerge from 'deepmerge';
import { useConfig } from '../hooks';

/**
 * Props of the `ThemeProvider` component.
 */
export interface ThemeProviderProps {
	/**
	 * Key of the theme to use for children components. If this prop is not set,
	 * the globally selected theme is used.
	 */
	theme?: string;

	/**
	 * Any custom overrides to the selected theme.
	 */
	overrides?: ThemeValueInput;

	children: React.ReactNode;
}

/**
 * Interface of object passed as param to the ThemeConsumer render prop method.
 */
export interface ThemeContextData {
	/** Helper method to change current theme. */
	changeTheme: (slug: string) => void;

	/** Current theme */
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
	const BB: BlueBase = useContext(BlueBaseContext);

	const [themeName, setThemeName] = useConfig('theme.name');
	const [mode] = useConfig('theme.mode');
	const [overridesConfig] = useConfig('theme.overrides');

	const name = props.theme || themeName;
	const overrides = deepmerge.all([{}, overridesConfig || {}, props.overrides || {}]);

	const DEFAULT_THEME = buildTheme(mode)({ value: overrides });

	const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param overrides
	 */
	async function setTheme(slug: string, cancelled: boolean) {
		try {
			const resolvedTheme = await BB.Themes.resolve(slug);

			if (!cancelled) {
				setThemeState(deepmerge(resolvedTheme, overrides) as Theme);
			}
		} catch (error) {
			BB.Logger.warn(
				`Could not change theme. Reason: Theme with the key "${slug}" does not exist.`
			);
		}
	}

	useEffect(() => {
		if (theme && theme.key === name) {
			return;
		}

		let cancelled = false;
		setTheme(name, cancelled);

		return () => {
			cancelled = true;
		};
	}, [name, mode, overrides]);

	const value: ThemeContextData = {
		changeTheme: setThemeName,
		theme,
	};

	return <ThemeContext.Provider value={value} children={props.children} />;
};

ThemeProvider.displayName = 'ThemeProvider';
