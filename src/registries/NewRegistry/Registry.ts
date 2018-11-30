import { BlueBase } from '../../BlueBase';
import isNil from 'lodash.isnil';
import { makeId } from '../../utils';

interface BaseMetaType { [key: string]: any }

/**
 * BlueBase Registry Item
 */
export interface RegistryItem<ValueType, MetaType> {

	/** Item Key */
	key: string;

	/**
	 * Registry Item Value.
	 */
	value: ValueType // BlueBaseModule<ValueType>,

	/**
	 * Additional meta data about this registry item
	 */
	meta: MetaType

	// subscriptions: {
	// 	[key: string]: (value: ValueType) => void;
	// };

	/** Additional Item Data */
	[key: string]: any,
}

export type RegistrySubscriptionFn<ValueType> = (value: ValueType, item: any) => void;

/**
 * A Base Registry
 */
export class Registry<ValueType, MetaType extends BaseMetaType> {

	/** Internal data */
	protected data: Map<string, RegistryItem<ValueType, MetaType>> = new Map();

	/** List of subscriptions */
	protected subscriptions: Map<string, Map<string, RegistrySubscriptionFn<ValueType>>> = new Map();

	constructor(protected BB: BlueBase) {
		//
	}

	/**
	 * The get() method returns a specified registry item.
	 * @param key
	 */
	public get(key: string) {
		return this.data.get(key);
	}

	/**
	 * The set() method adds or updates an element with a specified
	 * key and item to the registry.
	 * @param key
	 * @param value
	 */
	public set(key: string, item: RegistryItem<ValueType, MetaType> | any) {
		const i = this.createItem(key, item);
		const response = this.data.set(key, i);
		this.publish(key, i);

		return response;
	}

	/**
	 * The getValue() method returns a specified value from a Registry object.
	 * @param key
	 */
	public getValue(key: string): ValueType | undefined {
		const item = this.get(key);

		if (item) {
			return item.value;
		}

		return;
	}

	/**
	 * The setValue() method adds or updates the value a registry item with the specified key.
	 * @param key
	 * @param value
	 */
	public setValue(key: string, value: ValueType) {
		let item = this.get(key);

		if (item) {
			item.value = value;
		} else {
			item = this.createItem(key, { value });
		}

		return this.set(key, item);
	}

	public getMeta<K extends keyof MetaType>(key: string, metaKey: K) {
		const item = this.get(key);

		if (!item) {
			return;
		}

		return item.meta[metaKey];
	}

	public setMeta<K extends keyof MetaType>(key: string, metaKey: K, metaValue: MetaType[K]) {
		const item = this.get(key);

		if (!item) {
			return;
		}

		if (!item.meta) {
			item.meta = {} as any;
		}

		return item.meta[metaKey] = metaValue;
	}

	public async resolve(...keys: string[]) {

		let value;

		for (const key of keys) {
			value = this.getValue(key);

			if (!isNil(value)) {
				break;
			}
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

	/**
	 * The forEach() method executes a provided function once per
	 * each key/value pair in the Registry object, in insertion order.
	 * @param callbackfn
	 * @param thisArg
	 */
	public forEach(callbackfn: (
			value: RegistryItem<ValueType, MetaType>,
			key: string,
			map: Map<string, RegistryItem<ValueType, MetaType>>
		) => void, thisArg?: any) {
		this.data.forEach(callbackfn, thisArg);
	}

	// Filter Items/values
	public filter() {
		//
	}


	/**
	 * Subscribe to a config value update
	 * @param key Config key
	 * @param callback Callback function
	 * @returns Subscription ID
	 */
	public subscribe(key: string, callback: (value: any) => void): string {

		let subscriptions = this.subscriptions.get(key);

		// If theres no subscriptions map, create one
		if (!subscriptions) {
			subscriptions = new Map();
		}

		// Create a unique subscription ID
		const subId = this.createUniqueSubscriptionId([ ...subscriptions.keys() ]);

		// Set the callback function
		subscriptions.set(subId, callback);

		// Save the updated item
		this.subscriptions.set(key, subscriptions);

		return subId;
	}

	/**
	 * Unsubscribe from a config value update
	 * @param key Config key
	 * @param subscriptionId Subscription ID
	 */
	public unsubscribe(key: string, subscriptionId: string) {
		const subscriptions = this.subscriptions.get(key);

		if (!subscriptions) {
			throw Error(`Could not unsubscribe from a registry item. Reason: No item with key "${key}" registered.`);
		}

		if (!subscriptions.get(subscriptionId)) {
			// tslint:disable-next-line
			throw Error(`Could not unsubscribe from a registry item. Reason: No subscription with id "${subscriptionId}" registered.`);
		}

		subscriptions.delete(subscriptionId);

		this.subscriptions.set(key, subscriptions);
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: any): RegistryItem<ValueType, MetaType> {

		const item = {
			key,
			...partial,
		};

		if (!this.isItem(item)) {
			throw Error(`Could not set item. Reason: Unknown item type.`);
		}

		return item;
	}

	// Typeguard to check value
	protected isValue(value: any): value is ValueType {
		return !!(value);
	}

	// Typeguard to check item
	protected isItem(item: any): item is RegistryItem<ValueType, MetaType> {
		return (item as RegistryItem<ValueType, MetaType>).value !== undefined;
	}

	/**
	 * Creates a unique subscription ID for a given list of subscriptions.
	 * @param subscriptions An object containing current subscriptions
	 */
	private createUniqueSubscriptionId(subscriptionIds: string[]) {
		while(true) {
			const id = makeId();

			if (subscriptionIds.indexOf(id) === -1) {
				return id;
			}
		}
	}

	/**
	 * Publishes updates of a config value change to all the subscribers
	 * @param key
	 * @param item
	 */
	private publish(key: string, item: RegistryItem<ValueType, MetaType>) {

		const subscriptions = this.subscriptions.get(key);

		if (!subscriptions) {
			return;
		}

		subscriptions.forEach(fn => fn(item.value, item));
	}
}