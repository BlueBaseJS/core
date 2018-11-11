import { BlueBaseModule, MaybeBlueBaseModuleOrInput, getDefiniteBlueBaseModule, isClass } from '../../utils';
import { Theme, ThemeInput } from '../../models';
import { Registry } from '../Registry';
import { isThemeInput } from './helpers';

export interface ThemeRegistryItem {
	name: string,
	theme: BlueBaseModule<Theme>;
}

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends Registry<Theme> {

	/**
	 * Registers a Theme. Input can be any of the following:
	 *
	 * - A Theme Class
	 * - An instance of Theme Class
	 * - An object that has similar properties to a Theme object (ThemeInput)
	 *
	 * Moreover all of these can be split into BlueBaseModules
	 *
	 * @param theme Input
	 */
	public async register(theme: MaybeBlueBaseModuleOrInput<typeof Theme | Theme | ThemeInput>): Promise<void> {

		if (!theme) {
			throw Error(`Could not register theme. Reason: No theme provided in ThemeRegistry's register method.`);
		}

		theme = await getDefiniteBlueBaseModule(theme).promise;

		let finalTheme;

		// If pluign is an instance of Theme class
		if (theme instanceof Theme) {
			finalTheme = theme;
		}

		// If theme is an object
		else if (isThemeInput(theme)) {
			finalTheme = (new Theme(theme));
		}

		// If theme is a Class
		else if (isClass(theme)) {
			const classObj = (new (theme as typeof Theme)());

			// If this object is not an instance of Theme,
			// it means its no a Theme at all.
			if (classObj instanceof Theme) {
				finalTheme = classObj;
			}
		}

		// If none of the above
		if(!finalTheme) {
			throw Error('Could not register theme. Reason: Input variable is not a theme.');
		}

		// Run setup
		finalTheme = finalTheme.setup();

		// Save
		this.set(finalTheme.slug, finalTheme);
	}

	/**
	 * Unregisters a theme
	 * @param slug Theme slug
	 */
	public unregister(slug: string) {
		this.delete(slug);
		// TODO: Do we force rerender/reboot?
	}
}