/* @flow */

import set from 'lodash.set';
import get from 'lodash.get';
import merge from 'lodash.merge';

/**
 * A generic Registry class in the BlueRain OS. Used to store data.
 */
export default class Registry {

	name: string;
	Table: { [string]: any } = {};

	constructor(name: string) {

		if (!name) {
			throw new Error('Registry name is required');
		}

		this.name = name;
	}

	/**
	 * Add an item to the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	add(key: string, item: any) {
		if (key === undefined || key === null) {
			throw new Error(`No key provided in the add method of ${this.name} registry.`);
		}

		if (item === undefined || item === null) {
			throw new Error(`No item provided in the add method of ${this.name} registry.`);
		}

		if (this.has(key)) {
			throw new Error(`An item with ${key} key already exists in the ${this.name} registry. Try using the "replace" method instead.`);
		}

		set(this.Table, key, item);
	}

	/**
	 * Add an item to the Registry.
	 * Alias of 'add' method.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	register(key: string, item: any) {
		this.add(key, item);
	}

	/**
	 * Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	replace(key: string, item: any) {
		if (key === undefined || key === null) {
			throw new Error(`No key provided in the add method of ${this.name} registry.`);
		}

		if (item === undefined || item === null) {
			throw new Error(`No item provided in the add method of ${this.name} registry.`);
		}

		if (!this.has(key)) {
			throw new Error(`An item with ${key} key does not exist in the ${this.name} registry. Try using the "add" method instead.`);
		}

		set(this.Table, key, item);
	}

	/**
	 * Get an item from the Registry by its key.
	 *
	 * @param {string} key The key of the item
	 * @returns {any}
	 */
	get(key: string) : any {
		if (key === undefined || key === null) {
			throw new Error(`No key provided in the get method of ${this.name} registry.`);
		}

		return get(this.Table, key);
	}

	/**
	 * Check if an item is registered.
	 *
	 * @param {string} name The name of the item to check
	 * @returns {boolean}
	 */
	has(key: string) : boolean {
		if (key === undefined || key === null) {
			throw new Error(`No key provided in the has method of ${this.name} registry.`);
		}
		const item = this.Table[key];
		if (item === undefined || item === null) {
			return false;
		}
		return true;
	}

	/**
	 * Remove a plugin from the registry
	 * @param {string} key The key plugin to remove
	 */
	remove(key: string) {
		if (key === undefined || key === null) {
			throw new Error(`key cannot be ${key} in the remove method of ${this.name} registry.`);
		}
		if (!this.Table[key]) {
			throw new Error(`${key} is not registered in the ${this.name} registry.`);
		}

		delete this.Table[key];
	}

	/**
	 * Merge registry with another obne.
	 *
	 * @param {object} table The registry table
	 */
	merge(table: {}) {
		this.Table = merge(this.Table, table);
	}

}
