import { ErrorState, LoadingState } from '../getComponent';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';
import { Theme } from '../registries';
import { ThemeValueInput } from './structure';
import { merge } from '../utils';
import { useConfigUpdates } from '../hooks';

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

export interface ThemeProviderState {
	readonly loading: boolean;
	readonly theme?: Theme;
	readonly error?: any;
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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | undefined>();
	const [theme, setThemeState] = useState<Theme | undefined>();

	const BB: BlueBase = useContext(BlueBaseContext);
	const name = props.theme || BB.Configs.getValue('theme.name');
	const overrides = props.overrides || {};

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param overrides
	 */
	async function setTheme(slug: string, cancelled: boolean) {
		if (loading !== true) {
			setLoading(true);
		}

		try {
			const resolvedTheme = await BB.Themes.resolve(slug);

			if (cancelled) {
				return;
			}

			setThemeState(merge(resolvedTheme, overrides) as Theme);
			setLoading(false);
		} catch (error) {
			if (cancelled) {
				return;
			}

			setError(
				Error(`Could not change theme. Reason: Theme with the key "${slug}" does not exist.`)
			);
			setLoading(false);
		}
	}

	useConfigUpdates(
		'theme.name',
		(themeName: string, _i: any, cancelled: boolean) => setTheme(themeName, cancelled),
		[theme]
	);

	function loadTheme() {
		useEffect(() => {
			if (theme && theme.key === name) {
				return;
			}

			let cancelled = false;
			setTheme(name, cancelled);

			return () => {
				cancelled = true;
			};
		});
	}

	loadTheme();

	console.log('theme');
	if (error) {
		return <ErrorState error={error} retry={loadTheme} />;
	}

	if (loading) {
		return <LoadingState retry={loadTheme} />;
	}

	if (!theme) {
		return <ErrorState error={Error('Could not load theme.')} retry={loadTheme} />;
	}

	const value: ThemeContextData = {
		changeTheme: (slug: string) => {
			BB.Configs.setValue('theme.name', slug);
		},
		theme,
	};

	return <ThemeContext.Provider value={value} children={props.children} />;
};
