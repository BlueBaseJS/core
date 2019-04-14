import { ItemCollection, Registry, RegistryInputItem, RegistryItem } from './Registry';
import { ImageSourcePropType } from 'react-native';

export interface AssetRegistryItemExtras {
	type: 'audio' | 'photo' | 'video' | 'unknown';
	// width: number;
	// height: number;
	preload: boolean;
}

export type RequireSource = ImageSourcePropType;
export type AssetValue = RequireSource;

export type Asset = RegistryItem<AssetValue> & AssetRegistryItemExtras;
export type AssetInput = RegistryInputItem<AssetValue | string>;

export type AssetCollection = ItemCollection<AssetInput>;

/**
 * 🖼 AssetRegistry
 */
export class AssetRegistry extends Registry<Asset, AssetInput> {

	/**
	 * Resolves an Asset.
	 * @param keys
	 */
	public resolve(...keys: string[]) {
		return this.findOne(...keys);
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: any): Asset {

		// On web, require returns a string (webpack).
		// So we need to convert it to an object.
		const value = typeof partial.value === 'string'
		? { uri: partial.value }
		: partial.value;

		return super.createItem(key, {
			preload: false,
			type: 'unknown',
			...partial,
			value,
		});
	}

	/**
	 * Typeguard to check a given object is a registry value
	 * @param value
	 */
	protected isValue(value: any): value is Asset['value'] {
		return typeof value === 'number' || (typeof value === 'object' && !!value.uri);
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is AssetInput['value'] {
		return this.isValue(value) || typeof value === 'string';
	}

}
