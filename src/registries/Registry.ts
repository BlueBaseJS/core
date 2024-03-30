import isNil from 'lodash.isnil';

import { BlueBase } from '../BlueBase';
import { getDefiniteModule, makeId } from '../utils';

/**
 * Source of this item. Contains information about who registered this it.
 */
export interface ItemSource {
	type: 'plugin' | 'boot' | 'system' | 'custom';
	key?: string;
}

/**
 * BlueBase Registry Item
 */
export interface RegistryItem<ValueType = any> {
	/** Additional Item Data */
	[key: string]: any;

	/** Item Key */
	key: string;

	/**
	 * Registry Item Value.
	 */
	value: ValueType;

	/** The source of this item */
	source: ItemSource;
}

/**
 * BlueBase Registry Item
 */
export interface RegistryInputItem<ValueType = any> {
	/** Additional Item Data */
	[key: string]: any;

	/**
	 * Registry Item Value.
	 */
	value: ValueType;
}

/**
 * A collection of input items. Used by `registerCollection` function.
 */
export type ItemCollection<T extends RegistryInputItem = RegistryInputItem> =
	| Array<T | T['value']>
	| { [key: string]: T | T['value'] };

/**
 * Callback function called when a subscription update is published.
 */
export type RegistrySubscriptionFn<ItemType extends RegistryItem> = (
	value: ItemType['value'],
	item: ItemType
) => void;

/**
 * A Base Registry
 */
export class Registry<
	ItemType extends RegistryItem,
	ItemInputType extends RegistryInputItem = RegistryInputItem,
> {
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
		if (!this.isItem(item)) {
			throw Error(
				`Could not set registry item "${key}". Reason: Unknown item type: "${String(item)}"`
			);
		}

		// Override existing or create an new one
		const finalItem = this.createItem(key, item);

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

	/**
	 * The setMeta() method sets extra props of a registry item
	 * @param key
	 * @param props
	 */
	public setMeta(key: string, meta: { [key: string]: any }): void;
	public setMeta(key: string, metaKey: string, metaValue: any): void;
	public setMeta(key: string, metaKey: string | { [key: string]: any }, metaValue?: any) {
		const item = this.get(key);

		// Override existing
		if (!item) {
			return;
		}

		if (typeof metaKey === 'string') {
			this.data.set(key, {
				...item,
				[metaKey]: metaValue,
			});

			return;
		}

		this.data.set(key, {
			...item,
			...metaKey,
		});
	}

	/**
	 * The setMeta() method gets extra props of a registry item
	 * @param key
	 * @param props
	 */
	public getMeta(key: string, metaKey: string, defaultValue?: any) {
		const item = this.get(key);

		if (!item) {
			return;
		}

		const value = item[metaKey];

		if (isNil(value) && defaultValue) {
			return defaultValue;
		}

		return value;
	}

	/**
	 * Adds an Item or an Item value to the registry.
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
	public async register<T = ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']>(
		key: string | T,
		item?: T
	): Promise<string> {
		const args = this.getKeyAnyItem(key as any, item);

		if (this.isInputItem(args.item)) {
			this.set(args.key, args.item);
			return args.key;
		} else if (this.isInputValue(args.item)) {
			this.setValue(args.key, args.item);
			return args.key;
		}

		throw Error(
			`Could not register item "${args.key}". Reason: Unknown item type: "${String(args.item)}"`
		);
	}

	/**
	 * Register a collection of items.
	 * @param collection
	 */
	public async registerCollection(
		collection: ItemCollection<ItemInputType> = [],
		meta: { [key: string]: any; source?: ItemSource } = {}
	) {
		const keys: string[] = [];

		// If its an array
		if (Array.isArray(collection)) {
			for (const item of collection) {
				const key = await this.register(item);
				this.setMeta(key, meta);
				keys.push(key);
			}

			return keys;
		}
		// If its an object
		else if (collection === Object(collection)) {
			for (const key of Object.keys(collection)) {
				await this.register(key, collection[key]);
				this.setMeta(key, meta);
				keys.push(key);
			}

			return keys;
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
	public forEach(
		callbackfn: (value: ItemType, key: string, map: Map<string, ItemType>) => void,
		thisArg?: any
	) {
		this.data.forEach(callbackfn, thisArg);
	}

	/**
	 * Filter registry items by a predicate function.
	 * @param predicate
	 */
	public filter(predicate: (value: ItemType['value'], key: string, item: ItemType) => boolean) {
		const arr = Array.from(this.entries()).filter((entry: [string, ItemType]) =>
			predicate(entry[1].value, entry[0], entry[1])
		);
		const items: { [key: string]: ItemType } = {};

		Array.from(arr).forEach((entry: [string, ItemType]) => {
			items[entry[0]] = entry[1];
		});

		return items;
	}

	/**
	 * Filter registry items by a predicate function.
	 * @param predicate
	 */
	public filterValues(
		predicate: (value: ItemType['value'], key: string, item: ItemType) => boolean
	) {
		const arr = Array.from(this.entries()).filter((entry: [string, ItemType]) =>
			predicate(entry[1].value, entry[0], entry[1])
		);
		const items: { [key: string]: ItemType } = {};

		Array.from(arr).forEach((entry: [string, ItemType]) => {
			items[entry[0]] = entry[1].value;
		});

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
			throw Error(
				// eslint-disable-next-line max-len
				`Could not unsubscribe from a registry item. Reason: No subsciptions for item with key "${key}" registered.`
			);
		}

		if (!subscriptions.get(subscriptionId)) {
			return;
		}

		subscriptions.delete(subscriptionId);
		// this.subscriptions.set(key, subscriptions);
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: ItemType | ItemInputType): ItemType {
		const item = {
			source: {
				type: 'custom',
			},
			...(partial as any),
			key,
		};

		if (!this.isItem(item)) {
			throw Error(
				`Could not set item with key "${key}". Reason: Unknown item type: "${String(item)}"`
			);
		}

		return item;
	}

	/**
	 * Typeguard to check a given object is a registry value
	 * @param value
	 */
	protected isValue(value: any): value is ItemType['value'] {
		return value !== undefined;
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is ItemInputType['value'] {
		return value !== undefined;
	}

	/**
	 * Typeguard to check a given object is a registry item
	 * @param item
	 */
	protected isItem(item: any): item is ItemType {
		return !!item && (item as ItemType).value !== undefined;
	}

	/**
	 * Typeguard to check a given object is a input item
	 * @param item
	 */
	protected isInputItem(item: any): item is ItemInputType {
		return !!item && (item as ItemType).value !== undefined;
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

		subscriptions.forEach((fn: RegistrySubscriptionFn<ItemType>) => fn(item.value, item));
	}

	/**
	 * Find one item in a given sequence. Returns the first item found.
	 * @param keys
	 */
	protected findOne(...keys: any[]) {
		for (const tempKey of keys) {
			if (typeof tempKey !== 'string') {
				continue;
			}

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
	): { key: string; item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'] };
	protected getKeyAnyItem(
		key: string,
		item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): { key: string; item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'] };
	protected getKeyAnyItem(
		key: string | ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'],
		item?: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): { key: string; item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value'] } {
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
			throw Error(`Could not register item "${String(item)}". Reason: No key given.`);
		}

		if (finalItem === undefined) {
			throw Error(`Could not register item with key "${key}". Reason: No item given.`);
		}

		return { key: finalKey, item: getDefiniteModule(finalItem) };
	}

	/**
	 * This function is used to auto generate an item key
	 * @param item
	 */
	protected generateKey(
		_item: ItemType | ItemType['value'] | ItemInputType | ItemInputType['value']
	): string | undefined {
		return makeId();
	}
}
