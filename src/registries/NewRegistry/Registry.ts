import { BlueBase } from '../../BlueBase';
import { BlueBaseModule } from '../../utils';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * BlueBase Registry Item
 */
export interface RegistryItem<ValueType> {

	/**
	 * Registry Item Value.
	 */
	value: ValueType // BlueBaseModule<ValueType>,

	/** Additional Item Data */
	[key: string]: any,
}


export interface RegistryItemInternal<ValueType> extends RegistryItem<ValueType> {

	/** Item Key */
	key: string;

	subscriptions: {
		[key: string]: (value: ValueType) => void;
	};
}

export interface RegistryItemInput<ValueType> extends Partial<Omit<RegistryItem<ValueType>, 'value'>> {

	/**
	 * Registry Item Value.
	 */
	value: ValueType // MaybeBlueBaseModule<ValueType>,
}
// tslint:disable-next-line

/**
 * A Base Registry
 */
export class Registry<
	ValueType = any,
	RegistryItemType extends RegistryItem<ValueType> = RegistryItem<ValueType>,
	RegistryItemInternalType extends RegistryItemInternal<ValueType> = RegistryItemInternal<ValueType>,
	RegistryItemInputType extends RegistryItemInput<ValueType> = RegistryItemInput<ValueType>
> {

	/** Internal data */
	protected data: Map<string, RegistryItemInternalType> = new Map();

	constructor(protected BB: BlueBase) {
		//
	}

	/**
	 * The set() method adds or updates an element with a specified
	 * key and value to a Registry object.
	 * @param key
	 * @param value
	 */
	public set(key: string, value: ValueType) {
		let item = this.getItem(key);

		if (item) {
			item.value = value;
		} else {
			item = this.createItem(key, { value });
		}

		this.setItem(key, item);
	}

	/**
	 * The setItem() method adds or updates an element with a specified
	 * key and item to a Registry object.
	 * @param key
	 * @param value
	 */
	public setItem(key: string, item: RegistryItemInputType) {
		this.data.set(key, this.createItem(key, item));
	}

	/**
	 * The get() method returns a specified element from a Registry object.
	 * @param key
	 */
	public get(key: string): ValueType | undefined {
		const item = this.getItem(key);

		if (item) {
			return item.value;
		}

		return;
	}

	/**
	 * The get() method returns a specified element from a Registry object.
	 * @param key
	 */
	public getItem(key: string) {
		return this.data.get(key);
	}

	public async resolve(key: string) {
		// TODO:ComponentRegistry will use a pattern with multiple inputs

		const value = this.get(key);

		if (!value) {
			return;
		}

		return value;
	}

	/**
	 * The has() method returns a boolean indicating whether an element
	 * with the specified key exists or not.
	 * @param key
	 */
	public has(key: string) {
		return this.data.has(key);
	}

	/**
	 * The delete() method removes the specified element from a Registry object.
	 * @param key
	 */
	public delete(key: string) {
		return this.data.delete(key);
	}

	/**
	 * The clear() method removes all elements from a Registry object.
	 */
	public clear() {
		this.data.clear();
	}

	/**
	 * The entries() method returns a new Iterator object that
	 * contains the [key, value] pairs for each element in the Registry
	 * object in insertion order.
	 */
	public entries() {
		return this.data.entries();
	}

	// /**
	//  * The forEach() method executes a provided function once per
	//  * each key/value pair in the Registry object, in insertion order.
	//  * @param callbackfn
	//  * @param thisArg
	//  */
	// public forEach
	// 	(callbackfn: (value: RegistryItemType, key: string, map: Map<string, RegistryItemType>) => void, thisArg?: any) {
	// 	this.data.forEach(callbackfn, thisArg);
	// }

	/**
	 * The keys() method returns a new Iterator object that contains
	 * the keys for each element in the Registry object in insertion order.
	 */
	public keys() {
		return this.data.keys();
	}

	/**
	 * The values() method returns a new Iterator object that contains
	 * the values for each element in the Registry object in insertion order.
	 */
	public values() {
		return this.data.values();
	}

	/**
	 * Returns the number of items in the Registry.
	 */
	public size() {
		return this.data.size;
	}

	// Subscribe to value changes
	public subscribe() {
		//
	}

	// Publish a value change
	public publish() {
		//
	}

	// Filter Items/values
	public filter() {
		//
	}

	protected createItem(key: string, partial: RegistryItemInputType): RegistryItemInternalType {

		return {
			key,
			subscriptions: {},
			...(partial as any),
		};
	}

	// Typeguard to check value
	protected isValue(value: any): value is ValueType {
		return !!(value);
	}

	// Typeguard to check item
	protected isItem(item: any): item is RegistryItemType {
		return (item as RegistryItemType).value !== undefined;
	}
}