import { BaseMetaType, Registry } from './Registry';
import {
	BlueBaseModule,
	MaybeBlueBaseModule,
	createBlueBaseModule,
	getDefiniteBlueBaseModule,
	getDefiniteModule,
	isBlueBaseModule,
	isPromise,
} from '../../utils';

export interface BlueBaseModuleRegistryItemMeta extends BaseMetaType {
	preload: boolean,
}

/**
 * BlueBaseModule Registry Item
 */
export interface BlueBaseModuleRegistryItem<ValueType = any, MetaType = BlueBaseModuleRegistryItemMeta> {

	/** Item Key */
	key: string,

	/**
	 * Registry Item Value.
	 */
	value: BlueBaseModule<ValueType>,

	/**
	 * Additional meta data about this registry item
	 */
	meta: MetaType,

	/** Additional Item Data */
	[key: string]: any,
}

/**
 * BlueBase Registry Item
 */
export interface BlueBaseModuleRegistryInputItem<ValueType = any, MetaType = BlueBaseModuleRegistryItemMeta> {

	/**
	 * Registry Item Value.
	 */
	value: MaybeBlueBaseModule<ValueType>,

	/**
	 * Additional meta data about this registry item
	 */
	meta?: Partial<MetaType>,

	/** Additional Item Data */
	[key: string]: any,
}

export class BlueBaseModuleRegistry<
	ItemType extends BlueBaseModuleRegistryItem,
	ItemInputType extends BlueBaseModuleRegistryInputItem = BlueBaseModuleRegistryInputItem,
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


	public async register(item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']): Promise<string>;
	public async register(
		key: string,
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): Promise<string>;
	public async register(
		key: string | ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'],
		item?: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): Promise<string> {

		key = isPromise(key) ?  await createBlueBaseModule(key) : getDefiniteModule(key);
		item = isPromise(item) ?  await createBlueBaseModule(item) : getDefiniteModule(item);

		return super.register((key as any), item);
	}

	public async preload() {
		const items = this.filter((_value, key) => this.getMeta(key, 'preload'));
		const promises = Object.values(items).map((item) => item.value );

		return Promise.all(promises);
	}

	protected createItem(key: string, partial: ItemType | ItemInputType): ItemType {
		return super.createItem(key, {
			...(partial as any),
			value: getDefiniteBlueBaseModule(partial.value),
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
		return isBlueBaseModule(value) || !!(value);
	}
}
