import { Registry } from '../Registry';
import { Theme } from './Theme/theme';
import { createContext } from 'react';

export const ThemeContext: React.Context<Theme> = createContext(undefined as any);

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends Registry<Theme> {

	// TODO: create a proper default theme selection mechanism
	private selectedTheme = 'BlueBase.Light';

	public getSelectedTheme() {
		return this.get(this.selectedTheme);
	}

	public getSelectedThemeKey() {
		return this.selectedTheme;
	}

	public setSelectedThemeKey(key: string) {
		this.selectedTheme = key;
	}
}