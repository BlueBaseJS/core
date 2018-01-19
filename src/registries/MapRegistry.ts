import { Map } from 'immutable';

/**
 * A generic Registry class in the BlueRain OS. Used to store data.
 */
export default class Registry {
	name: string;
	data: Map<string, any>;

	constructor(name: string) {
		if (!name) {
			throw new Error('Registry name is required');
		}

		this.name = name;
		this.data = Map();
	}

	/**
	 * Add an item to the Registry.
	 * Removed check from bluerain-OS  map registry
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */

	set(key: string, item: any, ...rest: any[]) {
		if (!key) {
			throw new Error(`No  replace key provided in the add method of ${this.name} registry.`);
		}

		if (!item || typeof item === 'boolean') {
			throw new Error(`No   replace item provided in the add method of ${this.name} registry.`);
		}

		if (this.data.has(key)) {
			throw new Error(
				`An item with ${key} key already exists in the ${this.name} registry.` +
					` Try using the "replace" method instead.`
			);
		}

		this.data = this.data.set(key, item);
	}

	/**
	 * Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	replace(key: string, item: any) {
		if (!key) {
			throw new Error(`No key provided in the add method of ${this.name} registry.`);
		}

		if (!item || typeof item === 'boolean') {
			throw new Error(`No item provided in the add method of ${this.name} registry.`);
		}

		if (!this.has(key)) {
			throw new Error(
				`An item with ${key} key does not exist in the ${this.name} registry.` +
					` Try using the "add" method instead.`
			);
		}

		this.data = this.data.set(key, item);
	}

	/**
	 * Set or Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	setOrReplace(key: string, item: any) {
		if (!key) {
			throw new Error(`No key provided in the add method of ${this.name} registry.`);
		}
		if (!item || typeof item === 'boolean') {
			throw new Error(`No item provided in the add method of ${this.name} registry.`);
		}

		if (this.has(key)) {
			this.replace(key, item);
		} else {
			this.set(key, item);
		}
	}

	/**
	 * Get an item from the Registry by its key.
	 *
	 * @param {string} key The key of the item
	 * @returns {any}
	 */
	get(key: string): any {
		if (!key) {
			throw new Error(`No key provided in the get method of ${this.name} registry.`);
		}

		return this.data.get(key);
	}

	/**
	 * Check if an item is registered.
	 *
	 * @param {string} name The name of the item to check
	 * @returns {boolean}
	 */
	has(key: string): boolean {
		if (!key) {
			throw new Error(`No key provided in the has method of ${this.name} registry.`);
		}

		return this.data.has(key);
	}

	/**
	 * Remove a plugin from the registry
	 * @param {string} key The key plugin to remove
	 */

	remove(key: string, ...rest: any[]) {
		if (!key) {
			throw new Error(`key cannot be ${key} in the remove method of ${this.name} registry.`);
		}
		if (!this.data.has(key)) {
			throw new Error(`${key} is not registered in the ${this.name} registry.`);
		}

		this.data = this.data.delete(key);
	}

	/**
	 * Shallowly converts data collection to an Object.
	 */
	toObject() {
		return this.data.toObject();
	}
}
