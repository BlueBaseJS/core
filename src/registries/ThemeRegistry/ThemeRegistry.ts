import { Registry } from '../Registry';
import { Theme } from './Theme/theme';

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

		if(!this.has(key)) {
			throw Error(`Could not change theme. Reason: Theme with the key "${key}" does not exist.`);
		}

		this.selectedTheme = key;
	}
}