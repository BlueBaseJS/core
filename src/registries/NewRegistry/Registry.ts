import { getDefiniteModule, makeId } from '../../utils';
import { BlueBase } from '../../BlueBase';
import isNil from 'lodash.isnil';
import merge from 'deepmerge';

/**
 * BlueBase Registry Item
 */
export interface RegistryItem<ValueType = any> {

	/** Item Key */
	key: string,

	/**
	 * Registry Item Value.
	 */
	value: ValueType,

	/** Additional Item Data */
	[key: string]: any,
}

/**
 * BlueBase Registry Item
 */
export interface RegistryInputItem<ValueType = any> {

	/**
	 * Registry Item Value.
	 */
	value: ValueType,

	/** Additional Item Data */
	[key: string]: any,
}

export type RegistrySubscriptionFn<ItemType extends RegistryItem> = (value: ItemType['value'], item: ItemType) => void;

/**
 * A Base Registry
 */
export class Registry<ItemType extends RegistryItem, ItemInputType extends RegistryInputItem = RegistryInputItem> {

	/** Internal data */
	protected data: Map<string, ItemType> = new Map();

	/** List of subscriptions */
	protected subscriptions: Map<string, Map<string, RegistrySubscriptionFn<ItemType>>> = new Map();

	constructor(protected BB: BlueBase) {
		//
	}

	/**
	 * The get() method returns a specified registry item.
	 * @param key
	 */
	public get(...keys: string[]) {
		let item;

		for (const key of keys) {
			item = this.data.get(key);

			if (!isNil(item)) {
				break;
			}
		}

		return item ? item : undefined;
	}

	/**
	 * The set() method adds or updates an element with a specified
	 * key and item to the registry.
	 * @param key
	 * @param value
	 */
	public set(key: string, item: ItemType | ItemInputType) {

		if(!this.isItem(item)) {
			throw Error('Could not set registry item. Reason: Unknown item type.');
		}

		const existingItem = this.get(key);

		// Override existing or create an new one
		const finalItem = (existingItem) ? merge(existingItem, item) as ItemType : this.createItem(key, item);

		this.data.set(key, finalItem);
		this.publish(key, finalItem);

		return this;
	}

	/**
	 * The getValue() method returns a specified value from a Registry object.
	 * @param key
	 */
	public getValue(...keys: string[]): ItemType['value'] | undefined {

		let item;

		for (const key of keys) {
			item = this.get(key);

			if (!isNil(item)) {
				break;
			}
		}

		return item ? item.value : undefined;
	}

	/**
	 * The setValue() method adds or updates the value a registry item with the specified key.
	 * @param key
	 * @param value
	 */
	public setValue(key: string, value: ItemType['value'] | ItemInputType['value']) {
		const item = this.get(key);

		// Override existing
		if (item) {
			item.value = value;
			return this.set(key, item);
		}

		// Create a new item
		return this.set(key, { value } as any);
	}

	// public getMeta<K extends keyof ItemType['meta']>(key: string, metaKey: K) {
	// 	const item = this.get(key);

	// 	if (!item || !item.meta) {
	// 		return;
	// 	}

	// 	// FIXME: Fixe typing issues
	// 	return (item as any).meta[metaKey];
	// }

	// public setMeta<K extends keyof ItemType['meta']>(key: string, metaKey: K, metaValue: ItemType['meta'][K]) {
	// 	const item = this.get(key);

	// 	if (!item) {
	// 		return;
	// 	}

	// 	if (!item.meta) {
	// 		item.meta = {} as any;
	// 	}

	// 	// FIXME: Fixe typing issues
	// 	return (item as any).meta[metaKey] = metaValue;
	// }

	public async register(item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']): Promise<string>;
	public async register(
		key: string,
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): Promise<string>;
	public async register<T = ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']>(
		key: string | T,
		item?: T
	): Promise<string> {

		const args = this.getKeyAnyItem((key as any), item);

		if (this.isInputItem(args.item)) {
			this.set(args.key, args.item);
			return args.key;
		} else if (this.isInputValue(args.item)) {
			this.setValue(args.key, args.item);
			return args.key;
		}

		throw Error('Could not register item. Reason: Unknown item type.');
	}

	// TODO: Add tests
	public async registerCollection<T = ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']>
	(collection: T[] | { [key: string]: T }) {

		// If its an array
		if (Array.isArray(collection)) {
			for (const item of collection) {
				await this.register(item);
			}

			return;
		}
		// If its an object
		else if (collection === Object(collection)) {
			for (const key of Object.keys(collection)) {
				await this.register(key, collection[key]);
			}

			return;
		}

		throw Error('Could not register collection. Reason: Unknown collection type.');
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
			value: ItemType,
			key: string,
			map: Map<string, ItemType>
		) => void, thisArg?: any) {
		this.data.forEach(callbackfn, thisArg);
	}

	/**
	 * Filter registry items by a predicate function.
	 * @param predicate
	 */
	public filter(predicate: (value: ItemType['value'], key: string, item: ItemType) => boolean) {

		const arr = Array.from(this.entries()).filter((entry) => predicate(entry[1].value, entry[0], entry[1]));
		const items: { [key: string]: ItemType } = {};

		Array.from(arr).forEach(entry => {
			items[entry[0]] = entry[1];
		});

		return items;
	}

	/**
	 * Filter registry items by a predicate function.
	 * @param predicate
	 */
	public filterValues(predicate: (value: ItemType['value'], key: string, item: ItemType) => boolean) {

		const filtered = this.filter(predicate);
		const items: { [key: string]: ItemType } = {};

		for (const key in filtered) {
			if (filtered.hasOwnProperty(key)) {
				items[key] = filtered[key].value;
			}
		}

		return items;
	}

	/**
	 * Subscribe to a config value update
	 * @param key Config key
	 * @param callback Callback function
	 * @returns Subscription ID
	 */
	public subscribe(key: string, callback: RegistrySubscriptionFn<ItemType>): string {

		let subscriptions = this.subscriptions.get(key);

		// If theres no subscriptions map, create one
		if (!subscriptions) {
			subscriptions = new Map();
		}

		// Create a unique subscription ID
		const subId = makeId();

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
			// tslint:disable-next-line
			throw Error(`Could not unsubscribe from a registry item. Reason: No subsciptions for item with key \"${key}\" registered.`);
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
	protected createItem(key: string, partial: ItemType | ItemInputType): ItemType {

		const item = {
			meta: {},
			...(partial as any),
			key,
		};

		if (!this.isItem(item)) {
			throw Error(`Could not set item. Reason: Unknown item type.`);
		}

		return item;
	}

	/**
	 * Typeguard to check a given object is a registry value
	 * @param value
	 */
	protected isValue(value: any): value is ItemType['value'] {
		return !!(value);
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is ItemInputType['value'] {
		return !!(value);
	}

	/**
	 * Typeguard to check a given object is a registry item
	 * @param item
	 */
	protected isItem(item: any): item is ItemType {
		return (item as ItemType).value !== undefined;
	}

	/**
	 * Typeguard to check a given object is a input item
	 * @param item
	 */
	protected isInputItem(item: any): item is ItemInputType {
		return (item as ItemType).value !== undefined;
	}

	/**
	 * Publishes updates of a config value change to all the subscribers
	 * @param key
	 * @param item
	 */
	protected publish(key: string, item: ItemType) {

		const subscriptions = this.subscriptions.get(key);

		if (!subscriptions) {
			return;
		}

		subscriptions.forEach(fn => fn(item.value, item));
	}

	/**
	 * Find one item in a given sequence. Returns the first item found.
	 * @param keys
	 */
	protected findOne(...keys: string[]) {

		for (const tempKey of keys) {
			const item = this.data.get(tempKey);

			if (!isNil(item)) {
				return item;
			}
		}

		return;
	}


	/**
	 * Used internally by the register method. Since this function as many overloads,
	 * resolves final key and value params.
	 * @param item
	 */
	protected getKeyAnyItem(
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): { key: string, item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']};
	protected getKeyAnyItem(
		key: string,
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): { key: string, item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']};
	protected getKeyAnyItem(
		key: string | ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'],
		item?: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): { key: string, item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']} {

		let finalKey, finalItem;

		// 2 params were passed, key and item
		if (typeof key === 'string' && item !== undefined) {
			finalKey = key;
			finalItem = item;
		}

		// Only one param was passed to the function, this should be an item
		else if (key && (this.isItem(key) || this.isInputItem(key))) {
			finalKey = key.key;
			finalItem = key;
		}

		// No key exists, attempt to generate one
		if (!finalKey) {
			finalKey = this.generateKey(finalItem);
		}

		if (!finalKey) {
			throw Error('Could not register item. Reason: No key given.');
		}

		if (!finalItem) {
			throw Error('Could not register item. Reason: No item given.');
		}

		return { key: finalKey, item: getDefiniteModule(finalItem) };
	}

	/**
	 * This function is used to auto generate an item key
	 * @param item
	 */
	protected generateKey(_item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'])
	: string | undefined {
		return makeId();
	}
}