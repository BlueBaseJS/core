import React, { createContext } from 'react';

import { Theme } from '..';
import { Configs } from '../Configs';

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
export const ThemeConsumer: React.Consumer<ThemeContextData> = ThemeContext.Consumer;
