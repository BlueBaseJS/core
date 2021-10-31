import {
	BlueBaseModule,
	createBlueBaseModule,
	getDefiniteBlueBaseModule,
	getDefiniteModule,
	isBlueBaseModule,
	isPromise,
	MaybeBlueBaseModule,
} from '../utils';
import { ItemSource, Registry } from './Registry';

/**
 * BlueBaseModule Registry Item
 */
export interface BlueBaseModuleRegistryItem<ValueType = any> {
	/** Additional Item Data */
	[key: string]: any;

	/** Item Key */
	key: string;

	/**
	 * Registry Item Value.
	 */
	value: BlueBaseModule<ValueType>;

	/** The source of this item */
	source: ItemSource;

	/**
	 * Preload this value
	 */
	preload: boolean;
}

/**
 * BlueBase Registry Item
 */
export type BlueBaseModuleRegistryInputItem<ValueType = any, Extras = {}> = {
	/** Additional Item Data */
	[key: string]: any;

	/**
	 * Registry Item Value.
	 */
	value: MaybeBlueBaseModule<ValueType>;

	/**
	 * Preload this value
	 */
	preload?: boolean;
} & Extras;

/**
 * A registry that has all items as promises. Used to make parts of the app capable of
 * supporting code splitting.
 */
export class BlueBaseModuleRegistry<
	ItemType extends BlueBaseModuleRegistryItem,
	ItemInputType extends BlueBaseModuleRegistryInputItem = BlueBaseModuleRegistryInputItem
> extends Registry<ItemType, ItemInputType> {
	/**
	 * The set() method adds or updates an element with a specified
	 * key and item to the registry.
	 * @param key
	 * @param value
	 */
	public set(key: string, item: ItemType | ItemInputType) {
		return super.set(key, getDefiniteModule(item));
	}

	/**
	 * Adds an Item or an Item value to the registry. If the item is a BlueBaseModule,
	 * it is resolved first.
	 *
	 * @param item
	 */
	public async register(
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): Promise<string>;
	public async register(
		key: string,
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): Promise<string>;
	public async register(
		key: string | ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'],
		item?: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): Promise<string> {
		key = isPromise(key) ? await createBlueBaseModule(key) : getDefiniteModule(key);
		item = isPromise(item) ? await createBlueBaseModule(item) : getDefiniteModule(item);

		return super.register(key as any, item);
	}

	/**
	 * Preload all items that have preload property set to true
	 */
	public async preloadAll() {
		const items = this.filter(
			(_value: ItemType['value'], _key: string, item: ItemType) => item.preload === true
		);
		const promises = Object.values(items).map((item: ItemType) => item.value);

		return Promise.all(promises);
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: ItemType | ItemInputType): ItemType {
		const value = isBlueBaseModule(partial.value)
			? partial.value
			: getDefiniteBlueBaseModule(partial.value);

		return super.createItem(key, {
			preload: false,
			...(partial as any),
			value,
		});
	}

	/**
	 * Typeguard to check a given object is a registry value
	 * @param value
	 */
	protected isValue(value: any): value is ItemType['value'] {
		return isBlueBaseModule(value);
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is ItemInputType['value'] {
		return isBlueBaseModule(value) || !!value;
	}
}
