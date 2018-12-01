import { BlueBaseModule, MaybeBlueBaseModule, getDefiniteBlueBaseModule } from '../../utils';
import { Registry } from './Registry';

/**
 * BlueBaseModule Registry Item
 */
export interface BlueBaseModuleRegistryItem<ValueType, MetaType> {

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

export class BlueBaseModuleRegistry<ValueType, MetaType> extends Registry<BlueBaseModule<ValueType>, MetaType> {

	/**
	 * The set() method adds or updates an element with a specified
	 * key and item to the registry.
	 * @param key
	 * @param value
	 */
	public set(key: string, item: BlueBaseModuleRegistryItem<MaybeBlueBaseModule<ValueType>, MetaType> | any) {
		return super.set(key, item);
	}


	/**
	 * The setValue() method adds or updates the value a registry item with the specified key.
	 * @param key
	 * @param value
	 */
	public setValue(key: string, value: MaybeBlueBaseModule<ValueType>) {
		return super.setValue(key, value);
	}


	public async register(
		key: string,
		item: MaybeBlueBaseModule<BlueBaseModuleRegistryItem<ValueType, MetaType>> | any
	) {
		const module = await getDefiniteBlueBaseModule<BlueBaseModuleRegistryItem<ValueType, MetaType>>(item);
		return super.register(key, module);
	}

	// public async resolve(...keys: string[]) {

	// 	return await super.resolve(...keys);
	// }

	protected createItem(key: string, partial: any): BlueBaseModuleRegistryItem<ValueType, MetaType> {

		const item = {
			key,
			...partial,
			value: getDefiniteBlueBaseModule(partial.value),
		};

		if (!this.isItem(item)) {
			throw Error(`Could not set item. Reason: Unknown item type.`);
		}

		return item;
	}
}
