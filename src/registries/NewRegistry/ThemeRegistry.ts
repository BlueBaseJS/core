import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
	BlueBaseModuleRegistryItemMeta,
} from './BlueBaseModuleRegistry';
import { Theme, ThemeInput, createTheme } from '../../models';
import { getDefiniteBlueBaseModule } from '../../utils';


export interface ThemeRegistryItemMeta extends BlueBaseModuleRegistryItemMeta {
	/**
	 * Name of theme.
	 *
	 * We put it in meta so we can show the name in menu een without downloading
	 * the whole theme.
	 */
	name: string,

	/**
	 * Theme mode: Either light or dark.
	 */
	mode: 'light' | 'dark',

	/**
	 * Sometimes a user wants to switch to the light/dark version of the same theme.
	 * This property has the slug of that theme. For example, if this is a light theme,
	 * this property will have the slug of the dark version, and vice versa.
	 */
	alternate?: string,
}

export type ThemeRegistryItem = BlueBaseModuleRegistryItem<Theme, ThemeRegistryItemMeta>;
export type ThemeRegistryInputItem =
	BlueBaseModuleRegistryInputItem<ThemeInput, ThemeRegistryItemMeta>;

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends BlueBaseModuleRegistry<ThemeRegistryItem, ThemeRegistryInputItem> {

	public async resolve(...keys: string[]): Promise<Theme> {

		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following themes: [${keys.join(', ')}].`);
		}

		const theme = await item.value;
		const overrides: ThemeInput = this.BB.Configs.getValue('theme.overrides');

		// We pass through createTheme to make sure if theme has missed some rules,
		// they're provided
		return createTheme(item.mode, theme, overrides);
	}

	/**
	 * Get alternate version of current theme
	 * @param slug
	 */
	public async resolveAlternate(slug: string) {
		const name = this.getMeta(slug, 'alternate');
		return this.resolve(name);
	}

	protected createItem(key: string, partial: any): ThemeRegistryItem {

		const value = getDefiniteBlueBaseModule(partial.value);

		return super.createItem(key, {
			...partial,
			value,

			meta: {
				mode: 'light',
				name: 'Untitled Theme',

				...partial.meta,
			}
		});
	}

}