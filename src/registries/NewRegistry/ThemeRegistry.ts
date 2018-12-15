import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { ThemeValue, ThemeValueInput, buildTheme } from '../../models';
import { ItemCollection } from './Registry';
import { getDefiniteBlueBaseModule } from '../../utils';


export interface ThemeRegistryItemExtras {
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

	key: string,
}


export type ThemeRegistryItem = BlueBaseModuleRegistryItem<ThemeValue> & ThemeRegistryItemExtras;

export interface ThemeRegistryInputItem extends BlueBaseModuleRegistryInputItem<ThemeValueInput> {
}

type ItemType = ThemeRegistryItem;
type ItemInputType = ThemeRegistryInputItem;

export type Theme = ThemeRegistryItemExtras & ThemeValue;

export type ThemeInput = ThemeRegistryInputItem;

export type ThemeInputCollection = ItemCollection<ThemeInput>;

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends BlueBaseModuleRegistry<ItemType, ItemInputType> {

	public async resolve(...keys: string[]): Promise<Theme> {

		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following themes: [${keys.join(', ')}].`);
		}

		const theme: ThemeInput = { ...item, value: await item.value };
		const overrides: ThemeInput = { value: this.BB.Configs.getValue('theme.overrides') || {} };

		// We pass through createTheme to make sure if theme has missed some rules,
		// they're provided
		return buildTheme(item.mode)(theme, overrides);
	}

	/**
	 * Get alternate version of current theme
	 * @param key
	 */
	public async resolveAlternate(key: string): Promise<Theme> {
		const item = this.get(key);

		if (!item || !item.alternate) {
			throw Error(`Could not resolve alternate theme of "${key}".`);
		}

		return this.resolve(item.alternate);
	}

	protected createItem(key: string, partial: any): ThemeRegistryItem {

		const value = getDefiniteBlueBaseModule(partial.value);

		return super.createItem(key, {
			mode: 'light',
			name: 'Untitled Theme',
			...partial,
			value,
		});
	}

}