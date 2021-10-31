import { ImageRequireSource } from 'react-native';

import { loadAllFonts } from './helpers';
import { Registry, RegistryInputItem, RegistryItem } from './Registry';

export interface FontRegistryItemExtras {
	preload: boolean;
}

export type FontValue = ImageRequireSource | string;

export type Font = RegistryItem<FontValue> & FontRegistryItemExtras;
export type FontInput = RegistryInputItem<FontValue>;

export type FontCollection = { [key: string]: FontInput };

/**
 * 🔠 FontRegistry
 */
export class FontRegistry extends Registry<Font, FontInput> {
	public async load() {
		const items = this.filterValues((value: string | number) => !!value);
		await loadAllFonts(items as any);
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: any): Font {
		return super.createItem(key, {
			preload: false,
			...partial,
		});
	}

	/**
	 * Typeguard to check a given object is a registry value
	 * @param value
	 */
	protected isValue(value: any): value is Font['value'] {
		return typeof value === 'number' || typeof value === 'string';
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is FontInput['value'] {
		return this.isValue(value);
	}
}
