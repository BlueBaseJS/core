import { Theme, ThemeInput } from '../themes';
import { Registry, RegistryInputItem, RegistryItem } from './Registry';

export interface ThemeRegistryItemExtras {}

export type ThemeItem = RegistryItem<Theme> & ThemeRegistryItemExtras;
export type ThemeRegistryInput = RegistryInputItem<ThemeInput>;

export type ThemeCollection = ThemeInput[];

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends Registry<ThemeItem, ThemeRegistryInput> {
	/**
	 * Adds an Item or an Item value to the registry.
	 *
	 * @param item
	 */
	public async register<
		T = ThemeItem | ThemeItem['value'] | ThemeRegistryInput | ThemeRegistryInput['value'],
	>(key: string | T, item?: T): Promise<string> {
		return key instanceof Theme
			? super.register(key.key, key)
			: super.register(key as any, item as any);
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is ThemeRegistryInput['value'] {
		return value instanceof Theme;
	}

	/**
	 * Typeguard to check a given object is a registry item
	 * @param item
	 */
	protected isItem(item: any): item is ThemeItem {
		return item.value && item.value instanceof Theme;
	}

	/**
	 * Typeguard to check a given object is a input item
	 * @param item
	 */
	protected isInputItem(item: any): item is ThemeRegistryInput {
		return item.value && item.value instanceof Theme;
	}
}
