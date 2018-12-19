import {
	BlueBaseModule,
	MaybeBlueBaseModule,
	createBlueBaseModule,
	getDefiniteBlueBaseModule,
	getDefiniteModule,
	isBlueBaseModule,
	isPromise,
} from '../utils';
import { Registry } from './Registry';

/**
 * BlueBaseModule Registry Item
 */
export interface BlueBaseModuleRegistryItem<ValueType = any> {
	/** Item Key */
	key: string;

	/**
	 * Registry Item Value.
	 */
	value: BlueBaseModule<ValueType>;

	/**
	 * Preload this value
	 */
	preload: boolean;

	/** Additional Item Data */
	[key: string]: any;
}

/**
 * BlueBase Registry Item
 */
export interface BlueBaseModuleRegistryInputItem<ValueType = any> {
	/**
	 * Registry Item Value.
	 */
	value: MaybeBlueBaseModule<ValueType>;

	/**
	 * Preload this value
	 */
	preload?: boolean;

	/** Additional Item Data */
	[key: string]: any;
}

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
		const items = this.filter((_value, _key, item) => item.preload === true);
		const promises = Object.values(items).map(item => item.value);

		return Promise.all(promises);
	}

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
